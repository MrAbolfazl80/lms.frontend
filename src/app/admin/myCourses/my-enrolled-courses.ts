import { CommonModule, } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CoursesService, EnrolledCourseItem } from '../../services/courses.service';
import moment from 'jalali-moment';

@Component({
    selector: 'app-my-courses',
    standalone: true,
    imports: [CommonModule, NzTableModule, NzCardModule],
    templateUrl: './my-enrolled-courses.html',
    styleUrls: ['./my-enrolled-courses.css']
})
export class MyCoursesComponent implements OnInit {

    myCourses: EnrolledCourseItem[] = [];
    loading = false;
    pageNumber = 1;
    pageSize = 5;
    total = 0;

    constructor(private coursesService: CoursesService, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loadMyCourses();
    }

    loadMyCourses(): void {
        this.loading = true;
        this.coursesService.getEnrolledCoursesForAdmin(this.pageNumber, this.pageSize)
            .subscribe({
                next: (res) => {
                    if (res.success && res.data) {
                        this.myCourses = res.data.items;
                        this.total = res.data.totalCount;
                    }
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.loading = false;
                }
            });
    }

    onPageChange(page: number): void {
        this.pageNumber = page;
        this.loadMyCourses();
    }
    getShamsiDate(date: string | Date): string {
        return moment(date).locale('fa').format('YYYY/MM/DD');
    }
}
