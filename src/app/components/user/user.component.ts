import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/models/custom-http-response';
import { User } from 'src/app/models/user/user';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
}) 
export class UserComponent implements OnInit {
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable(); //je déclare un action qui récupere le titre et vois ce qu'il fait?
  public users: User[] = [];
  public user: User = new User();
  public refreshing: boolean=false;
  private subscription:Subscription[]=[];
  public selectedUser: User = new User;
  public lock :boolean=false ;
  public profileImage!: File;
  public fileName!:string;
  public editUser: User = new User;
  public currentUsername!: string;

  constructor(private userService:UserService,private notificationService:NotificationService, private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache(); //pour afficher le nom de l'user
    this.getUsers(true);


  
   
  }
  public changeTitle(title:string):void{
    this.titleSubject.next(title);
  }
  public getUsers( showNotification:boolean):void{
    this.refreshing = true; 
    this.subscription.push(
      this.userService.getUsers().subscribe(
        (response:User[]) =>{ //les utilisateurs se trouve dans response
          this.userService.addUsersToLocalCache(response);
        this.users =  response;
        this.refreshing=false;
        if(showNotification){
          this.sendNotification(NotificationType.SUCCESS,`${response.length} user(s) loaded successfully.`)
        }
        },
        (errorResponse:HttpErrorResponse)=>{
          this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
          this.refreshing=false;
        }
      )
    );
    
  }
  public onSelectUser(selectedUser:User):void{
    this.selectedUser=selectedUser;
    this.clickButton('openUserInfo');//"document" est lié à windows "?" dans le cas ou c'est null
    /*document.getElementById('openUserInfo')?.click();*/ 
  }
  public onProfileImageChange(fileName:string, profileImage:File):void{
    this.fileName = fileName;
    this.profileImage = profileImage;
    console.log("image:",this.profileImage);
    console.log("nom:", this.fileName);
    
    
  }
  public saveNewUser():void{
    this.clickButton('new-user-save');
    /*document.getElementById('new-user-save')?.click();*/
  }
  public deleteUser(userId:number):void{
    this.userService.deleteUser(userId);
  }
  public onAddNewUser(userForm:NgForm):void{
    const formData = this.userService.createUsersFormData(null as any,userForm.value,this.profileImage);
    this.subscription.push(this.userService.addUser(formData).subscribe(
      (response:User)=>{
        this.clickButton('new-user-close');
        /*document.getElementById('new-user-close')?.click();*/
        this.getUsers(false);
        this.fileName=null as any;
        this.profileImage=null as any;
        userForm.reset();
        this.sendNotification(NotificationType.SUCCESS,`${response.firstName} ${response.lastName} updated successfully`);
      },
      /*Dans le cas ou il n'a pas puo ajouter les données*/
      (errorResponse:HttpErrorResponse)=>{
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    ));
  }
  public onResetPassword(emailForm:NgForm):void{
    this.refreshing=true;
    const emailAdress = emailForm.value['reset-password-email'];
    this.subscription.push(
      this.userService.resetPassword(emailAdress).subscribe(
        (response:CustomHttpResponse)=>{
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.refreshing=false;
        }, 
        (errorResponse:HttpErrorResponse)=>{
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing=false;
        },
        ()=>emailForm.reset(),
      )
    );
  }
  //html ligne 45
  public searchUsers(searchTerm:string):void{
    console.log(searchTerm);
    const results:User[]=[];
    for(const user of this.userService.getUsersFromLocalCache()){
      if(user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
        results.push(user);
      }
    }
    console.log(results);
    
    this.users = results;
    if(results.length===0 || !searchTerm){
      this.users = this.userService.getUsersFromLocalCache();
    }
  }
  //html ligne 92
  public onEditUser(editUser:User):void{
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    this.clickButton('openUserEdit');
    console.log(this.currentUsername);
  }
  public onDeleteUser(userId:number):void{
    this.subscription.push(
      this.userService.deleteUser(userId).subscribe(
        (response:CustomHttpResponse)=>{
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getUsers(false);
        },
        (errorResponse:HttpErrorResponse)=>{
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null as any
        }
      )
    )
  }
  public onUpdateUser():void{
    const formData = this.userService.createUsersFormData(null as any, this.editUser,this.profileImage);
    this.subscription.push(this.userService.updateUser(formData).subscribe(
      (response:User)=>{
        this.clickButton('closeEditUserModalButton');
        /*document.getElementById('new-user-close')?.click();*/
        this.getUsers(false);
        this.fileName=null as any;
        this.profileImage=null as any;
        this.sendNotification(NotificationType.SUCCESS,`${response.firstName} ${response.lastName} updated successfully`);
      },
      /*Dans le cas ou il n'a pas pu ajouter les données*/
      (errorResponse:HttpErrorResponse)=>{
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.profileImage = null as any
      }
    ));
  }
  private sendNotification(notificationType: NotificationType, message: string):void {
    if(message){
      this.notificationService.notify(notificationType,message)
    }else{
      this.notificationService.notify(notificationType,'An error occured. Please try again.')
    }
    }
  private clickButton(buttonId:string):void{
    document.getElementById(buttonId)?.click();
  }

 

}