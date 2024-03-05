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
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  ],
  providers: [EmployeeService],
  templateUrl: './save-employee.component.html',
  styleUrl: './save-employee.component.scss',
})
export class SaveEmployeeComponent implements OnInit {
  mode!: Mode;
  id!: number;
  Gender = Gender;
  departments: Department[] = DEPARTMENT_TYPE;

  fb = inject(FormBuilder);
  activeRoute = inject(ActivatedRoute);
  employeeSerivc = inject(EmployeeService)

  saveForm: FormGroup = this.fb.group({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl(null, [Validators.required]),
    gender: new FormControl(Gender.MALE),
    department: new FormControl(null),
  });

  ngOnInit(): void {
    const { mode } = this.activeRoute.snapshot.data;
    const { id } = this.activeRoute.snapshot.params;
    
    this.mode = mode;
    this.id = id;
    
    if(id && Mode.EDIT === mode) {
      
    }
  }

  onClear(): void {
    this.saveForm.reset();
  }
}
