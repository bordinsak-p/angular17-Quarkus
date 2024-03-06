import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient)

  
  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/api/employee`);
  }
  
  getEmployeeSearch(HttpParams: HttpParams): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/api/employee/search`, { params: HttpParams });
  }

  getEmployeeById(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/api/employee/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.post<Employee[]>(`/api/employee`, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<any>(`/api/employee`, employee);
  }

  deleteEmployeeById(id: number): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`/api/employee/${id}`);
  }

}
