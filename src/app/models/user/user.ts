export class User {
    public id : number; //id pour la base de données
	public userId : string ; // id pour l'utilisateur
	public firstName : string;
	public lastName : string;
	public username : string;
	public email : string;
	public profileImageUrl : string;
	public lastLoginDate : Date;
	public lastLoginDateDisplay : Date;
	public joinDate : Date;
	public role :string; //role_user(edit, read), role_admin(delete)
	public authorities : string []; // sont permis de : read, edit, delete
	public isActive : boolean;
	public isNotLocked :boolean;

    constructor(){
        this.id=0;
        this.userId='';
        this.firstName='';
        this.lastName='';
        this.username='';
        this.email='';
        this.profileImageUrl='';
        this.lastLoginDate= new Date();
        this.lastLoginDateDisplay= new Date();
        this.joinDate= new Date();
        this.role='';
        this.authorities=[];
        this.isActive=true;
        this.isNotLocked=true;

    }
}