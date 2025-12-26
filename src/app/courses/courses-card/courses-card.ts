import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NzCardModule } from 'ng-zorro-antd/card';
import {CourseItem} from '../../services/courses.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'courses-card',
  templateUrl: './courses-card.html',
  styleUrls:['./courses-card.less'],
  imports:[CommonModule,NzCardModule,NzButtonModule,RouterModule],
  standalone:true
})
export class CoursesCardComponent {
    @Input() course!: CourseItem;
    @Output() enrollClicked = new EventEmitter<number>();

    onEnroll() {
        this.enrollClicked.emit(this.course.id);
    }
}