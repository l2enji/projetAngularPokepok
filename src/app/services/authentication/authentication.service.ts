import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(
    private http:HttpClient,
  ) {
    this.token='';
    this.loggedInUsername='';
   }
  public login(user:User):Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.host}/user/login`, user,{observe:'response'});
  }
  public register(user:User):Observable<User>{
    return this.http.post<User>(`${this.host}/user/register`, user);
  }
  public logOut():void{
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }
  public saveToken(token:string):void{
    this.token = token;
    localStorage.setItem('token',token); //Défini un token
  }
  public addUserToLocalCache(user:User):void{ // Ajoute un user au localStorage
    localStorage.setItem('user', JSON.stringify(user)); //pour transformer le User en "string user"
  }
  public getUserFromLocalCache(): User{ //recupere l'user du localStorage
    return JSON.parse(localStorage.getItem('user')! ); //! => doit etre non null, sinon retourne une chaine de caractere null => || '{}'
  }
  public loadToken(): void{
    this.token != localStorage.getItem('token'); //recupere le token dans le localStorage et le stock dans la variable token
  }
  public getToken():string{
    return this.token;
  }
  public isUserLoggedIn():boolean{ // verifie si l'user est connecté
    this.loadToken();
    if(this.token != null && this.token !==''){
      if(this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if(!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }else{
      this.logOut();
    return false ;
    }
    return false;
  }
}
