import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { ItemPage } from '../item/item';
/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  product: FirebaseObjectObservable<any>; // Single item
  products: FirebaseListObservable<any[]>; // List of items

  itemName: string; itemPrice: number; itemDescription: string; ownerID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fbProvider: FirebaseProvider) {
    this.ownerID="4";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }
  
  getProduct(itemId: string) {
    return this.product = this.fbProvider.getProduct(itemId);
  }
  retrieveItem(){
  }
  uploadItem(event) {
    //this.itemName=itemTitle;

    this.fbProvider.addProduct(this.itemName, this.itemPrice, this.itemDescription,this.ownerID);

    // That's right, we're pushing to ourselves!
   // this.navCtrl.push(ItemPage );
  }
}
