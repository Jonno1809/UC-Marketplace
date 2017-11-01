import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseApp } from 'angularfire2'; // for methods
import * as firebase from 'firebase/app'; // for typings
import {ItemDetails} from '../../models/itemDetails';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import { ImageProvider } from '../../providers/image/image';
import {LoginPage} from '../login/login';
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
  providers:[AngularFireAuth]
})
export class AddItemPage {
  //itemdetails = as {} ItemDetails;
  itemTitle;
  itemPrice;
  itemDescription;
  ownerId;
  imageUrls;
  date;

  product: FirebaseObjectObservable<any>; // Single item
  //products: FirebaseListObservable<any[]>; // List of items

  private productsByUser: FirebaseListObservable<any[]>;
  private productImages: FirebaseListObservable<any[]>;

  private imagesForUpload: number = 0;

  constructor(public afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public fbProvider: FirebaseProvider, public imgProvider: ImageProvider) {
  }

  ionViewDidLoad() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user.email && user.uid) {
        if(user.displayName==null){
         var displayname:string[];
         displayname=user.email.split("@",1);
        this.ownerId=displayname[0];
        }else this.ownerId=user.displayName;
      } else {
        this.navCtrl.push(LoginPage);
      }
      console.log(user.email);
    });
  }
  
  getProduct(itemId: string) {
    return this.product = this.fbProvider.getProduct(itemId);
  }
  getImage(){
    console.log(this.itemPrice);
    console.log(this.itemDescription);
  }
  uploadItem(event) {
    //this.itemName=itemTitle;
    let imgs = this.imgProvider.getImagesForUpload();
    this.imageUrls="null";
        for (let i = 0; i < imgs.length; i++) {
          this.fbProvider.uploadImage(imgs[i]);
        }
        this.imagesForUpload = 0;

    this.fbProvider.addProduct(this.itemTitle, this.itemPrice, this.itemDescription, this.imageUrls, this.ownerId);

    // That's right, we're pushing to ourselves!
    if(this.navCtrl.canSwipeBack()==true){
      this.navCtrl.pop();
    }else this.navCtrl.push(ItemPage);
  }
  
  openPhotoGallery() {
    this.imgProvider.openPhotoGallery();
    this.imagesForUpload = this.imgProvider.getNumImages();
  }
  
  uploadImages() {
    let imgs = this.imgProvider.getImagesForUpload();

    for (let i = 0; i < imgs.length; i++) {
      this.fbProvider.uploadImage(imgs[i]);
    }
    this.imagesForUpload = 0;
  }

}
