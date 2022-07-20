import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product:any=[];    //Définit les produit car je veux ajouter des produit dans la page
  public grandTotal!:number; // le "!" veut dire qu'il est non null
  public orderList:any=[];
  public quant:number=1;
  static quant2: any;

  constructor(private cartService:CartService,
    // private orderService:OrderService
     ) { }

  ngOnInit(): void {
    this.cartService.getProducts()
     // this.orderService.getAllOrders()
      .subscribe(
      res => {
        this.product=res; //Ajoute à la liste des produits, les produits
        this.grandTotal=this.cartService.getTotalPrice();
        //this.orderList=res ;    

      }
    ),
    this.cartService.getProducts().subscribe(
      data =>{
        console.log(data);
        
        this.quant ;
        CartComponent.quant2=this.quant
      }
    );
  
  }

  addOne(){
    if(this.quant>=0)
    this.quant = this.quant+1;
    CartComponent.quant2=this.quant
    this.grandTotal=this.quant*this.cartService.getTotalPrice();
  }
  deleteOne(){
    if(this.quant>=1)
    this.quant = this.quant-1;
    CartComponent.quant2=this.quant
    this.grandTotal=this.quant*this.cartService.getTotalPrice();
  }
  removeItem(item:any){
    this.cartService.removeCartItem(item);
  }
  emptyCart(){
    this.cartService.removeAllCart();
  }
  getTotalPrice(){
    this.cartService.getTotalPrice();
  }
}
