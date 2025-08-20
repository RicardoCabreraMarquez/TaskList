import { Component, OnInit } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../models/tarea.model';
import { environment } from '../../../../../environment/environment';


@Component({
  selector: 'app-task-list-page',
  imports: [InputGroupModule, InputGroupAddonModule, ButtonModule,
    CheckboxModule, FormsModule
  ],
  templateUrl: './task-list-page.html',
  styleUrl: './task-list-page.css',
})

export class TaskListPage implements OnInit{
  version: string = environment.version;

  textoTarea: string = '';

  listaTareas: Tarea[] = [];

  value3: string | undefined;
  checked: boolean = false;

  ngOnInit(): void {
    const listaTareaString = localStorage.getItem("tareas");
    if (listaTareaString) {
      this.listaTareas = JSON.parse(listaTareaString) as Tarea[];
    }
  }

  /**
   * Metodo que guarda la tarea en el localStorage
   * 
   * @param descripcionTarea 
   */
  saveTaskLocalStorage(descripcionTarea: string) {
    const tarea: Tarea = {
      descripcionTarea: descripcionTarea,
      estaHecha: false
    }

    this.listaTareas.push(tarea);
    // Visualizar el valor de la tarea
    // console.log("Tarea añadida: " + JSON.stringify(tarea))

    // Se guarda la tarea en el localStorage
    localStorage.setItem("tareas", JSON.stringify(this.listaTareas))
  }

  /**
   * Metodo que actualiza la tarea si esta hecha o no hecha.
   * 
   * @param descripcionTarea 
   */
  updateTaskDone(descripcionTarea: string) {
    const indexTarea = this.listaTareas.findIndex((tarea: Tarea) => tarea.descripcionTarea === descripcionTarea);

    if(indexTarea < 0) {
      if(this.listaTareas[indexTarea].estaHecha == false) {
        this.listaTareas[indexTarea].estaHecha = true;
      } else {
        this.listaTareas[indexTarea].estaHecha = false;
      }
    }

    localStorage.setItem("tareas", JSON.stringify(this.listaTareas))
  }

  /**
   * Metodo que elimina la tarea
   * 
   * @param descripcionTarea 
   */
  deleteTask(descripcionTarea: string) {
    const indexTarea = this.listaTareas.findIndex((tarea: Tarea) => tarea.descripcionTarea === descripcionTarea);

    this.listaTareas.splice(indexTarea, 1);

    localStorage.setItem("tareas", JSON.stringify(this.listaTareas))
  }
}
