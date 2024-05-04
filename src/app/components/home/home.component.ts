import { Component, Inject, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReminderComponent } from '../reminder/reminder.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NotesContainerComponent } from '../notes/notes-container/notes-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: 
  [
    AddTaskComponent, FormsModule, 
    CommonModule, ReminderComponent, 
    TaskListComponent,  RouterLink,
    NotesContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  addingTask: boolean = false;
  remindings: boolean = false;
  isLogged: boolean = false;

authService: AuthService = inject(AuthService)

ngOnInit(): void {
  this.authService.user$.subscribe(user => {
    if(user){
      this.isLogged = true;
    }
  })

  this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
    if (authenticated) {
      console.log('Successful');
    } else {
      console.log('User not authenticated');
    }
  });
}


  Open(data: string){
    if(data === 'task'){
      this.addingTask = !this.addingTask;
    }else if(data === 'reminder'){
      this.remindings = !this.remindings;
    }

  }


}
