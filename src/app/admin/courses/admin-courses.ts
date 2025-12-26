import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService, AdminCourseItem } from '../../services/courses.service';
import moment from 'jalali-moment';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UpsertCourseFormComponent } from './Upsert/admin-upsert-course-form';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule, AgGridModule, NzButtonModule, NzModalModule],
  templateUrl: './admin-courses.html',
  styleUrls: ['./admin-courses.css']
})
export class AdminCoursesComponent {
  constructor(
    private coursesService: CoursesService,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }
  pageSize = 20;
  gridApi: any;

  columnDefs: ColDef<AdminCourseItem>[] = [
    {
      headerName: 'عملیات',
      field: 'id',
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        const editBtn = document.createElement('button');
        editBtn.innerText = 'ویرایش';
        editBtn.style.margin = '0px 5px';
        editBtn.className = 'ant-btn ant-btn-primary';
        editBtn.addEventListener('click', () => this.editCourse(params.data));

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'حذف';
        deleteBtn.className = 'ant-btn ant-btn-danger';
        deleteBtn.addEventListener('click', () => this.deleteCourse(params.data));

        container.appendChild(editBtn);
        container.appendChild(deleteBtn);
        return container;
      }
    },
    {
      maxWidth: 200,
      headerName: 'توضیحات',
      field: 'description',
      sortable: false,
      valueFormatter: (params: any) => {
        const text = params.value || '';
        return text.length > 50 ? text.substring(0, 50) + '...' : text;
      }
    },
    {
      sortable: false,
      maxWidth: 130,
      headerName: 'تاریخ پایان',
      field: 'endDate',
      valueFormatter: (params: ValueFormatterParams<AdminCourseItem>) => this.getShamsiDate(params.value)
    },
    {
      maxWidth: 130,
      sortable: false,
      headerName: 'تاریخ شروع',
      field: 'startDate',
      valueFormatter: (params: ValueFormatterParams<AdminCourseItem>) => this.getShamsiDate(params.value)
    },
    {
      headerName: 'مانده',
      maxWidth: 70,
      sortable: false,
      valueGetter: (params: any) => {
        const data = params.data;
        if (!data) return 0;
        return (data.capacity ?? 0) - (data.enrolledCount ?? 0);
      }
    },
    { headerName: 'ظرفیت', field: 'capacity', sortable: false, maxWidth: 80 },
    { headerName: 'هزینه ثبت نام', field: 'fee', sortable: false, maxWidth: 110 },
    { headerName: 'مدرس', field: 'teacherName', sortable: false, maxWidth: 120 },
    { headerName: 'عنوان', field: 'title', sortable: false, maxWidth: 160 }
  ];


  onGridReady(params: any) {
    this.gridApi = params.api;
    const dataSource = {
      getRows: (gridParams: any) => {
        const page = Math.floor(gridParams.startRow / this.pageSize) + 1;

        this.coursesService.getAllCoursesForAdmin(page, this.pageSize).subscribe({
          next: (res) => {
            if (res.success) {
              gridParams.successCallback(res.data.items, res.data.totalCount);
            } else {
              gridParams.failCallback();
              this.message.error('خطا در دریافت داده‌ها');
            }
          },
          error: () => gridParams.failCallback()
        });
      }
    };

    params.api.setGridOption('datasource', dataSource);
    params.api.sizeColumnsToFit();
  }


  getShamsiDate(date: string | Date): string {
    return moment(date).locale('fa').format('YYYY/MM/DD');
  }

  deleteCourse(course: AdminCourseItem): void {
    this.modal.confirm({
      nzTitle: 'آیا از حذف دوره مطمئن هستید؟',
      nzContent: `دوره "${course.title}" حذف خواهد شد.`,
      nzOkText: 'حذف',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'انصراف',
      nzOnOk: () => {
        this.coursesService.deleteCourseForAdmin(course.id).subscribe(res => {
          if (res.success) {
            this.message.success('دوره حذف شد!');
            setTimeout(() => this.gridApi.refreshInfiniteCache(), 0);
          } else {
            this.message.error(res.error ?? 'خطا در حذف دوره');
          }
        });
      }
    });
  }


  createCourse(): void {
    const modalRef = this.modal.create({
      nzTitle: 'ایجاد دوره جدید',
      nzContent: UpsertCourseFormComponent,
      nzFooter: [
        {
          label: 'انصراف',
          onClick: () => modalRef.destroy()
        },
        {
          label: 'ثبت',
          type: 'primary',
          onClick: () => {
            const instance = modalRef.getContentComponent() as UpsertCourseFormComponent;

            instance.form.markAllAsTouched();

            if (instance.form.invalid) {
              this.message.error('لطفاً همه فیلدهای الزامی را پر کنید');
              return;
            }

            this.coursesService.createCourseForAdmin(instance.form.value).subscribe({
              next: (res) => {
                if (res.success) {
                  this.message.success('دوره با موفقیت ایجاد شد');
                  setTimeout(() => this.gridApi.refreshInfiniteCache(), 0);
                  modalRef.destroy();
                } else {
                  this.message.error(res.error ?? 'خطا در ایجاد دوره');
                }
              },
              error: () => this.message.error('خطا در ایجاد دوره')
            });
          }
        }
      ]
    });
  }
  editCourse(course: AdminCourseItem): void {
    const modalRef = this.modal.create({
      nzTitle: 'ویرایش دوره',
      nzContent: UpsertCourseFormComponent,
      nzFooter: [
        {
          label: 'انصراف',
          onClick: () => modalRef.destroy()
        },
        {
          label: 'ثبت تغییرات',
          type: 'primary',
          onClick: () => {
            const instance = modalRef.getContentComponent() as UpsertCourseFormComponent;

            if (instance.form.invalid) {
              instance.form.markAllAsTouched();
              return;
            }

            this.coursesService.updateCourseForAdmin(course.id, instance.form.value).subscribe({
              next: (res) => {
                if (res.success) {
                  this.message.success('ویرایش دوره با موفقیت انجام شد');
                  setTimeout(() => this.gridApi.refreshInfiniteCache(), 0);
                  modalRef.destroy();
                } else {
                  this.message.error(res.error ?? 'خطا در ویرایش دوره');
                }
              },
              error: () => this.message.error('خطا در ویرایش دوره')
            });
          }
        }
      ]
    });

    const instance = modalRef.getContentComponent() as UpsertCourseFormComponent;
    instance.form.patchValue({
      title: course.title,
      teacherName: course.teacherName,
      capacity: course.capacity,
      fee: course.fee,
      startDate: course.startDate,
      endDate: course.endDate,
      description: course.description
    });
  }
}
