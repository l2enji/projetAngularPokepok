import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { CartComponent } from "./components/cart/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ClientComponent } from "./components/client/client.component";
import { FournisseurComponent } from "./components/fournisseur/fournisseur.component";
import { LoginComponent } from "./components/login/login.component";
import { ProductComponent } from "./components/product/product.component";
import { ProduitComponent } from "./components/produit/produit.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserComponent } from "./components/user/user.component";
import { ContactComponent } from "./contact/contact.component";
import { AuthenticationGuard } from "./guard/authentication.guard";

//Création de la table de routage (tableau qui contient les routes)

const routes:Routes=[
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  //{ path:'user/management', component:UserComponent},
  { path:'user/management', component:UserComponent, canActivate:[AuthenticationGuard]},
  //{ path:'', redirectTo:'/login', pathMatch:'full'},
  { path:'',redirectTo:'product', pathMatch:'full'},
  { path:"product", component : ProductComponent},
  
  {
    path:"client", 
    component :ClientComponent
  },

  { path:"produit", component : ProduitComponent},
  { path:"fournisseur", component : FournisseurComponent},
  { path:"cart", component : CartComponent},
  { path:"contact", component : ContactComponent},
  { path:"checkout", component : CheckoutComponent}

];

@NgModule({
  imports :[RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule{}