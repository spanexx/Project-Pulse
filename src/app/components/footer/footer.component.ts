import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  logoUrl = '../../../assets/logo.png';
  logoAlt = '../../../assets/logoText.png';
  profileIcon = '../../../assets/profileIcon.png'
  loggedIn: boolean = false;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        this.loggedIn = true;
        this.authService.currentUserSig.set({
          email: user.email!,
          displayName: user.displayName!,
        })
      }else{
        this.authService.currentUserSig.set(null);
      }
    })
  }

    logOut(){
    this.authService.logOut().subscribe({
      next: ()=>{
        this.router.navigate(['/']).then(()=>{
          window.location.reload();
        })
      },
      error: ()=>{}
    })
    }
}
