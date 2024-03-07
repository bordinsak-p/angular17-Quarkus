import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, RouterModule],
  templateUrl: './search-table.component.html',
  styleUrl: './search-table.component.scss',
})
export class SearchTableComponent {
  employees: Employee[] = []
  
  @Input()
  tableValue: any;

  @Output()
  employeesEvent = new EventEmitter<Employee[]>()

  route = inject(Router);
  employeeService = inject(EmployeeService);
  messageService = inject(MessageService);

  onSave() {
    this.route.navigate(['save']);
  }

  onDelete(id: number) {
    this.employeeService.deleteEmployeeById(id).subscribe(res => {
      this.employees = res
      this.employeesEvent.emit(this.employees)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    })
  }
}
