import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
  isLoading: boolean = false; 
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isError: boolean = false;
  isSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.email, rawForm.password)
    .subscribe({
      next: ()=> {this.router.navigate(['/']);
    }, error: (error) => 
      {this.errorMessage = error}
  })
      
  }

  hideSnackBar() {
    setTimeout(() => {
      this.isError = false;
      this.isSuccess = false;
    }, 3000);
  }
}