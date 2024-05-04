import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false; 
  signupForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isError: boolean = false;
  isSuccess: boolean = false;

  constructor(
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'displayName': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const rawForm = this.signupForm.getRawValue();
    this.authService.register(rawForm.email, rawForm.displayName, rawForm.password)
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
