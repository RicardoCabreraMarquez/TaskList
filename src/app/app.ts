import { Component } from '@angular/core';
import { TaskListPage } from './features/inicio/pages/task-list-page/task-list-page';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [TaskListPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);
    // this.primeng.inputVariant.set('filled') // Solo sirve para el tema Material
  }
}
