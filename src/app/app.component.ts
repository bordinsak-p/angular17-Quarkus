import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EmployeeSearchComponent,
    HttpClientModule,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'employee-ui';
}
