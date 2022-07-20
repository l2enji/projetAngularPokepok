import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS  } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { ProduitComponent } from './components/produit/produit.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './services/notification/notification.service';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ProduitComponent,
    FournisseurComponent,
    HeaderComponent,
    ProductComponent,
    CartComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,


  ],
  providers: [NotificationService, AuthenticationGuard, AuthenticationService, UserService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,
    multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
