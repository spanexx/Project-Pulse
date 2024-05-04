import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../Models/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-update-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './task-update-form.component.html',
  styleUrl: './task-update-form.component.css'
})
export class TaskUpdateFormComponent {
  addTaskForm!: FormGroup;
  @Input() selectedTAsk!: Task;
  @Input()selectedTaskID!: string;
  @Input() showModal: boolean = false; 


  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      name: new FormControl(this.selectedTAsk.name, Validators.required),
      description: new FormControl(this.selectedTAsk.description, Validators.required),
      status: new FormControl(this.selectedTAsk.status, Validators.required)  
    });
  }

  @Output() closeModalEvent = new EventEmitter<void>(); 

  closeModal() {
    this.closeModalEvent.emit(); 
    this.showModal = false;
  }
  
  onUpdate() {
    if (this.addTaskForm.valid && this.selectedTaskID) {
      const updatedTask: Task = {
        ...this.addTaskForm.value, 
        id: this.selectedTaskID 
      };

      this.taskService.updateTask(this.selectedTaskID, updatedTask).subscribe({
        next: () => {
          console.log("Task updated successfully!");
  
          this.closeModal(); 
        },
        error: (error) => {
          console.error("Error updating task:", error);
        }
      });
    } else {
      console.error('Form invalid or missing task ID');
    }
  }
}
