import { Component, OnInit, inject } from '@angular/core';
import { Department } from '../../model/department';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';
import { Gender } from '../../constants/gender.constant';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SearchTableComponent } from '../search-table/search-table.component';
import { HttpParams } from '@angular/common/http';
import { DEPARTMENT_TYPE } from '../../constants/department.constant';
import { Observable, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [
    RouterOutlet,
    PanelModule,
    FormsModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    SearchTableComponent,
  ],
  providers: [EmployeeService],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.scss',
})
export class EmployeeSearchComponent implements OnInit {
  Gender = Gender;
  department?: string;
  employees!: Employee[];
  departments: Department[] = DEPARTMENT_TYPE

  fb = inject(FormBuilder)
  employeeService = inject(EmployeeService)

  employeeForm: FormGroup = this.fb.group({
    firstname: new FormControl(null),
    lastname: new FormControl(null),
    department: new FormControl(null),
    gender: new FormControl(null),
  });

  ngOnInit(): void {
    this.onQueryTable();
    this.employeeForm.valueChanges.pipe(
      debounceTime(200),
      switchMap(() => this.onSearch())
    ).subscribe((res: Employee[]) => this.employees = res)
  }

  onQueryTable(): void {
    this.employeeService.getEmployee().subscribe((res: Employee[]) => {
      this.employees = res;
    });
  }
  
  onQueryTableAfterDelete(employee: any) {
    this.employees = employee
    this.onQueryTable();
  }

  onSearch(): Observable<Employee[]> {
    const employeeData = this.employeeForm.getRawValue();
    let httpParams = new HttpParams();

    if (employeeData.firstname) {
      httpParams = httpParams.append('firstName', employeeData.firstname);
    }
    if (employeeData.lastname) {
      httpParams = httpParams.append('lastName', employeeData.lastname);
    }
    if (employeeData.gender) {
      httpParams = httpParams.append('gender', employeeData.gender);
    }
    if (employeeData.department) {
      httpParams = httpParams.append(
        'department',
        employeeData.department.code
      );
    }  

    return this.employeeService.getEmployeeSearch(httpParams)
  }

  onClear(): void {
    this.employeeForm.reset();
    this.onQueryTable();
  }
}
