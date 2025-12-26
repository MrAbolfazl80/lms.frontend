import { Component, Input, OnInit,signal  } from "@angular/core";
import { CourseItem, CoursesService } from "../../services/courses.service";
import { ActivatedRoute } from "@angular/router";
import { BaseResponse } from "../../models/base-response.model";
import moment from 'jalali-moment';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'courses-card',
    templateUrl: './courses-detail.html',
    styleUrl: './courses-detail.css',
    imports: [RouterModule],
    standalone: true
})
export class CoursesDetailComponent implements OnInit {
    courseId!: number;
    course = signal<CourseItem | null>(null);
    constructor(private route: ActivatedRoute, private coursService: CoursesService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.courseId = Number(params.get('courseId'));

            if (this.courseId) {
                this.loadCourse();
            }
        });
    }

    loadCourse(): void {
        this.coursService.getCourseById(this.courseId)
            .subscribe({
                next: (res: BaseResponse<CourseItem>) => {
                    if (res.success) {
                        this.course.set(res.data);
                    }
                }
            });
    }
  getShamsiDate(date: string | Date): string {
    return moment(date).locale('fa').format('YYYY/MM/DD');
  }
}