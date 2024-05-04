import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AngularFireModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toDOv2';

  constructor(private authService: AuthService) {}

  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        console.log(user);
        this.authService.currentUserSig.set({
          email: user.email!,
          displayName: user.displayName!,
        })
      }else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    })
  }

  
}


