import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-first',
  standalone: true,
  imports: [InputTextModule],
  templateUrl: './first.component.html',
  styleUrl: './first.component.scss'
})
export class FirstComponent {
  name = 'Hello Jame';
  disableInput = false;

  onKeyup(event : Event) { 
    this.name = (event.target as HTMLInputElement).value;
  }
  
}
