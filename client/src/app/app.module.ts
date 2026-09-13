import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MovieComponent } from './movie/movie.component';
import { environment } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin
    }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
