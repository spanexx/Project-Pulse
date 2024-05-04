import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'add-task',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'] // Corrected property name
})
export class AddTaskComponent {
  addTaskForm!: FormGroup;
  @Input()modal: boolean = true
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.addTaskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl('pending')  // Default status
    });
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      const newTask = this.addTaskForm.value; 

      this.taskService.createTask(newTask).subscribe({
        next: (task: Task) => { 
          this.router.navigate(['/']);
          this.addTaskForm.reset();
          this.addTaskForm.get('status')?.setValue('pending'); 
          this.closeModal();
        },
        error: (error: any) => { 
          console.error("Error adding task:", error);
        },
        complete: () => { 
          console.log("Task added successfully!"); 
        }
      });
    }
  }

  closeModal(){
    this.modal = !this.modal;
    this.closeModalEvent.emit();

  } 
}
