import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CustomHttpResponse } from 'src/app/models/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http:HttpClient) { }

  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.host}/user/list`); //récupere la liste des utilisateur
  }
  public addUser(formData:FormData):Observable<User>{
    return this.http.post<User>(`${this.host}/user/add`, formData); //récupere la liste des utilisateur
  }
  public updateUser(formData:FormData):Observable<User>{
    return this.http.post<User>(`${this.host}/user/update`, formData); //
  }
  public resetPassword(email:string):Observable<CustomHttpResponse>{
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetPassword/${email}`); //
  }
  public updateProfileImage(formData:FormData):Observable<HttpEvent<User>>{
    return this.http.post<User>(`${this.host}/user/updateProfileImage`,formData,
    {
      reportProgress:true,
      observe:'events'
    }); //
  }
  public deleteUser(userId:number):Observable<CustomHttpResponse>{
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`); //
  }
  public addUsersToLocalCache(user:User[]):void{
    localStorage.setItem('user', JSON.stringify(user)); //Ajoute un user dans la cache du navigateur
  }
  public getUsersFromLocalCache(): User[]{ //recupere les users du localStorage
    if(localStorage.getItem('user')){
    return JSON.parse(localStorage.getItem('user')! ); //! => doit etre non null, sinon retourne une chaine de caractere null => || '{}'
   }
   return [];
  }
  public createUsersFormData(loggedInUsername:string, user:User,profileImage:File): FormData{
    const formData = new FormData();
    formData.append('CurrentUsername',loggedInUsername);
    formData.append('firstName',user.firstName);
    formData.append('lastName',user.lastName);
    formData.append('username',user.username);
    formData.append('email',user.email);
    formData.append('role',user.role);
    formData.append('isActive',JSON.stringify(user.isActive));
    formData.append('isNotLocked',JSON.stringify(user.isNotLocked));
    formData.append('profileImageUrl',profileImage);
    return formData;
  }
   
  
}
