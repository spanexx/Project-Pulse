import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reminder } from '../../Models/Reminder.model';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../Services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent {
  reminder: Reminder = new Reminder();
  reminderForm!: FormGroup;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input()modal: boolean = true


  repeatOptions: string[] = ['none', 'daily', 'weekly', 'monthly', 'custom'];
  priorityOptions: string[] = ['high', 'medium', 'low'];
  notificationOptions: string[] = ['email', 'sms', 'push', 'app'];

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.reminderForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      email: [''],
      phone: [''],
      dateTime: ['', Validators.required],
      repeat: ['none'],
      priority: ['medium'],
      notificationPreferences: [[]],
      location: [''],
      notes: [''],
      attachments: [[]],
      calendarIntegration: [false],
      smartSuggestions: [false],
      customizableThemes: [false],
      collaborationFeatures: [false]
    });

    this.notificationOptions.forEach(option => {
      this.reminderForm.addControl(option, this.fb.control(false));
    });
  }

  onSubmit() {
    if (this.reminderForm.valid) {
      this.reminder = this.reminderForm.value;
  
      // Extract selected notification preferences
      const selectedPreferences = this.notificationOptions.filter(option => this.reminderForm.get(option)?.value);
  
      // Assign selected preferences to notificationPreferences array
      this.reminder.notificationPreferences = selectedPreferences;
  
      console.log('Reminder submitted:', this.reminder);
  
      this.taskService.createReminder(this.reminder).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.reminderForm.reset();
          this.reminderForm.get('repeat')?.setValue('none');
          this.reminderForm.get('priority')?.setValue('medium');
          this.closeModal();
        }
      });
    }
  }
  

  closeModal(){
    this.modal = !this.modal;
    this.closeModalEvent.emit();

  } 
}