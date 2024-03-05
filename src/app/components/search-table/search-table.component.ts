import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-search-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './search-table.component.html',
  styleUrl: './search-table.component.scss'
})
export class SearchTableComponent {
  @Input()
  tableValue: any

  route = inject(Router)

  onSave() {
    this.route.navigate(['save'])
  }
}
