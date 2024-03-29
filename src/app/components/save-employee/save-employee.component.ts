import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Gender } from '../../constants/gender.constant';
import { DEPARTMENT_TYPE } from '../../constants/department.constant';
import { Department } from '../../model/department';
import { Mode } from '../../constants/mode.constant';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-save-employee',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    PanelModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    RouterModule,
    RadioButtonModule,
    FormsModule,
    ToastModule
  ],
  providers: [EmployeeService],
  templateUrl: './save-employee.component.html',
  styleUrl: './save-employee.component.scss',
})
export class SaveEmployeeComponent implements OnInit {
  mode!: Mode;
  id!: number;
  Gender = Gender;
  btnStatus: boolean = false;
  titleHeader: string = 'บันทึกข้อมูล พนักงาน';
  departments: Department[] = DEPARTMENT_TYPE;

  fb = inject(FormBuilder);
  route = inject(Router);
  activeRoute = inject(ActivatedRoute);
  employeeSerivce = inject(EmployeeService);
  messageService = inject(MessageService);

  saveForm: FormGroup = this.fb.group({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl(null, [Validators.required]),
    gender: new FormControl(Gender.MALE),
    department: new FormControl(null),
    version: new FormControl(null),
    id: new FormControl(null),
  });

  ngOnInit(): void {
    const { mode } = this.activeRoute.snapshot.data;
    const { id } = this.activeRoute.snapshot.params;

    this.mode = mode;
    this.id = id;

    // check mode edit
    if (id && Mode.EDIT === mode) {
      this.employeeSerivce.getEmployeeById(id).subscribe((res: Employee[]) => {
        this.saveForm.patchValue(res);
        this.btnStatus = true;
        this.titleHeader = 'แก้ไขข้อมูล พนักงาน';
      });
    }
  }

  onSaveAndEdit() {
    const payload = this.saveForm.getRawValue() as Employee;      

    if(this.saveForm.valid) {
      if (Mode.EDIT == this.mode) {
        this.employeeSerivce.updateEmployee(payload).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Add employee success.' });
          this.route.navigate(['/']);
        });
      } else {
        this.employeeSerivce.addEmployee(payload).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Edit employee success.' });
          this.saveForm.reset();
        });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Message', detail: 'Please enter your data.' });
    }

    
  }

  onClear(): void {
    this.saveForm.reset();
    this.saveForm.controls['gender'].setValue(Gender.MALE)
  }
}
