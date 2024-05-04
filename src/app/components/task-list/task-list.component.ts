import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Task, TaskStatus } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';
import { FilterComponent } from '../filter/filter.component';
import { TaskUpdateFormComponent } from '../task-update-form/task-update-form.component';



@Component({
  selector: 'task-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule, FilterComponent, TaskUpdateFormComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks!: Task[]
  selectedTask?: Task
  selectedTaskId?: string
  showModal: boolean = false;
  selectedStatus = 'all'; 
  filteredTasks: Task[] = [];
  searchTerm: string = '';


  constructor(private taskService: TaskService) {

  }


  ngOnInit() {
    this.loadTasks(); // Load initial tasks
  }

  loadTasks() {
    if (this.selectedStatus === 'all') {
      // Fetch all tasks (you might already have a method for this)
      this.taskService.getTasks().subscribe(tasks => { 
        this.tasks = tasks
        this.filteredTasks = tasks
        this.applySearchFilter();

      });
    } else {
      this.taskService.getTasksByStatus(this.selectedStatus).subscribe(tasks => {
        this.tasks = tasks.map(task => task.data); 
        this.filteredTasks = tasks.map(task => task.data);
        this.applySearchFilter();

      });
    }
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.loadTasks(); 
  }


  deleteTask(taskId: string ) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
      error: (error: any) => {
        console.error("Error deleting task:", error);
      },
      complete: () => {
        console.log("Task deleted successfully!");
      }
    });
  }

  editTask(taskId: string, task: Task) {
    this.taskService.getTask(taskId).subscribe(task => {
      this.selectedTask = task;
      this.selectedTaskId = taskId;
      this.showModal = true;
    
    })
    // console.log("Editing task with ID:", taskId);
  }

  getTaskStatusClass(task: Task): string {
    if (task.status === TaskStatus.Pending) {
      return 'task-pending';
    } else if (task.status === TaskStatus.Started) {
      return 'task-started';
    } else if (task.status === TaskStatus.Completed) {
      return 'task-completed';
    } else if (task.status === TaskStatus.InProgress) {
      return 'task-in-progress';
    } else {
      return ''; // Handle any unexpected statuses
    }
  }


  closeModal() {
    this.showModal = false;
  }


  applySearchFilter() {
    if (this.searchTerm.trim() === '') {
      // No search term, display all tasks
      this.filteredTasks = this.tasks;
    } else {
      // Apply search filter based on task name or description
      const searchTerm = this.searchTerm.toLowerCase().trim();
      this.filteredTasks = this.tasks.filter(task => 
        task.name.toLowerCase().includes(searchTerm) || 
        task.description.toLowerCase().includes(searchTerm)
      );
    }

}
}