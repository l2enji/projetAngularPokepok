import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  static quant: any;
  [x: string]: any;
  public cartItemList : any=[];
  public productList = new BehaviorSubject<any>([]);
  public quant:number=1;

  constructor() { }
    getProducts(){
      return this.productList.asObservable();
    }

    setProduct(product:any){
      this.cartItemList.push(...product); //met à la suite des autres produits de la liste
      this.productList.next(product);
    }
    addToCart(product:any){
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList); //s'il exite un produit, il le rajoute a la liste de produit
      this.getTotalPrice();
      console.log("carte:"+this.cartItemList);
    }
    
    
    getTotalPrice(){
      let grandTotal = 0;
      let tot=0;
      this.cartItemList.map((a:any) =>{
        tot = a.prixVenteHT*this.quant;
        grandTotal =tot+grandTotal;
        console.log("total:"+grandTotal);
      }
      );
      return grandTotal;
    }
    removeCartItem(product:any){
      this.cartItemList.map(
        (a:any, index:any) =>{
          if(product.id==a.id){
            this.cartItemList.splice(index, 1);
          }
        }
      );
      this.productList.next(this.cartItemList);
    }
    removeAllCart(){
      this.cartItemList=[];
      this.productList.next(this.cartItemList);
    }
   
}
