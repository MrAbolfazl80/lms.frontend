import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CoursesService, CourseItem } from '../services/courses.service';
import { ChangeDetectorRef } from '@angular/core';
import { EnrollmentService } from '../services/enrollment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CoursesCardComponent } from './courses-card/courses-card';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzPaginationModule,CoursesCardComponent],
  templateUrl: './courses.html',
  styleUrls: ['./courses.less']
})
export class CoursesComponent implements OnInit {
  courses: CourseItem[] = [];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 6;

  constructor(private coursesService: CoursesService, private cdr: ChangeDetectorRef, private enrollmentService: EnrollmentService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getAvailableCourses(this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            this.courses = res.data.items as CourseItem[];
            this.totalCount = res.data.totalCount;
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          this.messageService.error('خطا در ارتباط با سرور');
        }
      });
  }


  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadCourses();
  }
  handleEnroll(courseId: number): void {
    this.enrollmentService.enroll(courseId).subscribe({
      next: (res) => {
        if (res.data) {
          this.messageService.success('ثبت نام انجام شد');
          this.loadCourses();
        } else {
          this.messageService.error(res.error ?? 'خطا در انجام ثبت نام');
        }
      },
      error: (error) => {
        this.messageService.error(error['error'].error ?? 'ارتباط با سرور برقرار نشد.');
      }
    });
  }
}
