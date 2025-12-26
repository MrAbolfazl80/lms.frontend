import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './myAppConfigService';
import { BaseResponse } from '../models/base-response.model';
import { PagedResponse } from '../models/paged-response-model';
export interface AdminCourseItem {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  fee: number;
  teacherName: string;
  enrolledCount: number;
}
export interface EnrolledCourseItem {
  id: number;
  title: string;
  fee: number;
  teacherName: string;
  enrolledAt: string;
}
export interface AdminCreateCourseRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  fee: number;
  teacherName: string;
}
export interface AdminUpdateCourseRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  fee: number;
  teacherName: string;
}
export interface CourseItem {
  id: number;
  title: string;
  teacherName: string;
  capacity: number;
  enrolledCount: number;
  remainingSeats: number;
  isOpenForEnrollment: boolean;
  startDate: string;
  endDate: string;
  isEnrolledByCurrentUser: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient, private appConfig: AppConfigService) { }

  getCourseById(courseId: number)
    : Observable<BaseResponse<CourseItem>> {
    return this.http.get<BaseResponse<CourseItem>>(
      `${this.appConfig.baseUrl}/course/getById/${courseId}`
    );
  }
  getAvailableCourses(pageNumber: number, pageSize: number)
    : Observable<BaseResponse<PagedResponse<CourseItem>>> {
    return this.http.get<BaseResponse<PagedResponse<CourseItem>>>(
      `${this.appConfig.baseUrl}/course/GetAvailableCourses?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllCoursesForAdmin(pageNumber: number, pageSize: number)
    : Observable<BaseResponse<PagedResponse<AdminCourseItem>>> {
    return this.http.get<BaseResponse<PagedResponse<AdminCourseItem>>>(
      `${this.appConfig.baseUrl}/course/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getEnrolledCoursesForAdmin(pageNumber: number, pageSize: number)
    : Observable<BaseResponse<PagedResponse<EnrolledCourseItem>>> {
    return this.http.get<BaseResponse<PagedResponse<EnrolledCourseItem>>>(
      `${this.appConfig.baseUrl}/course/getEnrolledCourses?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  deleteCourseForAdmin(courseId: number)
    : Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(
      `${this.appConfig.baseUrl}/course/Delete/${courseId}`
    );
  }

  createCourseForAdmin(data: AdminCreateCourseRequest)
    : Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(
      `${this.appConfig.baseUrl}/course/Create`,
      data
    );
  }

  updateCourseForAdmin(courseId: number, data: AdminUpdateCourseRequest): Observable<BaseResponse<number>> {
    return this.http.put<BaseResponse<number>>(
      `${this.appConfig.baseUrl}/course/Update/${courseId}`,
      data
    );
  }
}
