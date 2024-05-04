import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule, FormStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
