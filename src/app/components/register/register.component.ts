import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading: boolean = false;
  private subcription:Subscription[] = [];

  constructor(private router:Router, private authenticationService:AuthenticationService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/user/management')
    }else{
      this.router.navigateByUrl('/register')
    }
  }

  ngOnDestroy():void{
    this.subcription.forEach(sub => sub.unsubscribe());
  }
  public onRegister(user:User):void{
    this.showLoading = true;
    console.log(user);
    this.subcription.push(
      this.authenticationService.register(user).subscribe(
        (response:User)=>{
          this.showLoading=false;
          this.sendErrorNotification(NotificationType.SUCCESS, `A new account has been create for ${response.firstName}. Please check your email for password to log in.`);
      },
      (errorResponse:HttpErrorResponse) =>{
        this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
        this.showLoading=false;
      }
      )
    )
  }
  private sendErrorNotification(notificationType: NotificationType, message: string):void {
    if(message){
      this.notificationService.notify(notificationType,message)
    }else{
      this.notificationService.notify(notificationType,'An error occured. Please try again')
    }
  }

}
