import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environments/environmen.prod';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp(()=> initializeApp(environment.firebase)),
      provideAuth(()=> getAuth()),
      AngularFireModule.initializeApp(environment.firebase),

  ]),
  provideHttpClient(),

  

  
]

};

