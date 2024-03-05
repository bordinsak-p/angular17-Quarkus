import { Routes } from '@angular/router';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { SaveEmployeeComponent } from './components/save-employee/save-employee.component';
import { Mode } from './constants/mode.constant';

export const routes: Routes = [
  { path: '', component: EmployeeSearchComponent, pathMatch: 'full' },
  { path: 'save', component: SaveEmployeeComponent, data: { mode: Mode.ADD } },
  { path: 'save/:id', component: SaveEmployeeComponent, data: { mode: Mode.EDIT } },
]
