import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { BehaviorSubject, Observable, Subject, from, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { APi, AuthResponse } from '../Models/AuthREsponse';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth'
import { User } from '../Models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireAuth = inject(Auth)
  user$ = user(this.fireAuth);
  currentUserSig = signal<User | null | undefined>(undefined)
  

  constructor(private angularFireAuth: AngularFireAuth) {}

  

  register(email: string, displayName: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.fireAuth, email, password
    ).then(response => updateProfile(response.user, {displayName}))
    return from(promise);
  }

  login(email: string, password: string){
    const promise = signInWithEmailAndPassword(
      this.fireAuth, email, password
    ).then(()=>{})
    return from(promise);
  }

  logOut(): Observable<void> {
    const promise = signOut(this.fireAuth)
    return from(promise);
  }


  isAuthenticated(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      map(user => !!user)
    );
  }
}
