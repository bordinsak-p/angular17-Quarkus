import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient)

  getEmployeeSearch(HttpParams: HttpParams): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/api/employee/search`, { params: HttpParams });
  }
  
  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/api/employee`);
  }

  
  getEmployeeById(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/api/employee/${id}`);
  }



  addEmployee(data: any): Observable<Employee[]> {
    return this.http.post<Employee[]>(`${environment.apiUrl}employee`, data);
  }


}
