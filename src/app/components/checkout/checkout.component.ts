/*import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private handler:any = null;

 

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.loadStripe();

     
  }

  public pay(amount:any){

    var handler = (<any>window).StripCheckout.configure({
      key:'sk_test_51KsMMgBVONHwYaOucMzKbpYCfEejgMimQAwga1wHsmkOq2nfYNkxu968LURRDFNlOFm69sudVAsoNADFwZvfUTlY00fbS15Vm4', //Private key
      locale: 'auto',
      token: function (token:any){
        
        console.log(token)
        alert();
      }
    });

    handler.open({
      name: 'EDIDEBS SAS',
      description: '2 widgets',
      amount: amount * 100
    });
  }

  public loadStripe(){

    if(!window.document.getElementById('stripe-script')){
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key :'pk_test_51KsMMgBVONHwYaOuUKM7qv0brXZhmDc7g0zXvZ6rv1UU5DtEUFrIfZSjNqrwKWTurvTFkCOZ2miaH9PVU5iRUQIl00kWaIaM60', //Public key
          locale : 'auto',
          token: function (token: any){
           
          console.log(token)
          alert('Payment Success!');
          },
        });
      };
      window.document.body.appendChild(s);
    }
  }

  getTotalPrice(){
    this.cartService.getTotalPrice();
  }
}*/

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartComponent } from '../cart/cart/cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  paymentHandler: any = null;
  public product:any=[];    //Définit les produit car je veux ajouter des produit dans la page
  public grandTotal!:number; // le "!" veut dire qu'il est non null
  public quant :any = CartComponent.quant2;

  constructor(private cartService:CartService) {}
  ngOnInit() {
    this.invokeStripe();

    this.cartService.getProducts()
    // this.orderService.getAllOrders()
     .subscribe(
     res => {
       this.product=res; //Ajoute à la liste des produits, les produits
       this.grandTotal= this.quant*this.cartService.getTotalPrice();
       //this.orderList=res ;    

     }
   ),
   this.cartService.getProducts().subscribe(
     data =>{
       console.log(data);
       
       this.quant ;
     }
   ); 
  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KsMMgBVONHwYaOuUKM7qv0brXZhmDc7g0zXvZ6rv1UU5DtEUFrIfZSjNqrwKWTurvTFkCOZ2miaH9PVU5iRUQIl00kWaIaM60',
      locale: 'auto',
      token: function (stripeToken: any) {
        //You can access the token ID with 'token.id'
        //Get the token ID to your server side code for use
        console.log(stripeToken);
        alert('Thanks for your payment!');
        
      },
    });
    paymentHandler.open({
      name: 'Pokepok',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KsMMgBVONHwYaOuUKM7qv0brXZhmDc7g0zXvZ6rv1UU5DtEUFrIfZSjNqrwKWTurvTFkCOZ2miaH9PVU5iRUQIl00kWaIaM60',
          locale: 'auto',
          token: function (stripeToken: any) {
            //You can access the token ID with 'token.id'
          //Get the token ID to your server side code for use
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}