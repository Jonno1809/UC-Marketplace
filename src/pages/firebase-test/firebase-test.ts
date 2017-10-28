import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ImageProvider } from '../../providers/image/image';

/**
 * Generated class for the FirebaseTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firebase-test',
  templateUrl: 'firebase-test.html',
})
export class FirebaseTestPage {

  product: FirebaseObjectObservable<any>; // Single item
  products: FirebaseListObservable<any[]>; // List of items

  productsByUser: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fbProvider: FirebaseProvider, public imgProvider: ImageProvider) {
    // this.getProduct('-KuObmXeYx0-zxj1pbVm');
  }

  //Runs when the view has loaded, see https://ionicframework.com/docs/api/navigation/NavController/
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirebaseTestPage');
  }

  // Runs when the page is about to enter and become the active page, see https://ionicframework.com/docs/api/navigation/NavController/ (there's heaps of these!)
  // Place anything you want to run when the page loads here (you can probably also put it in the constructor) 
  ionViewWillEnter() {
    this.getProduct('-KuObmXeYx0-zxj1pbVm');
    this.getAllProducts();
    this.getProductsByUser('Tim Allen');
  }

  /**
   * Fetches a product and stores it for use.
   * @param itemId the id string of the item
   */
  getProduct(itemId: string) {
    return this.product = this.fbProvider.getProduct(itemId);
  }

  /**
   * Fetches all products and stores them for use
   */
  getAllProducts() {
    return this.products = this.fbProvider.getAllProducts();
  }

  deleteProduct(itemId: string) {
    this.fbProvider.deleteProduct(itemId);
  }

  openPhotoGallery() {
    this.imgProvider.openPhotoGallery();
  }
  
  uploadImage() {
    let img = this.imgProvider.getImageSrc();
    this.fbProvider.uploadImage(img);
  }

  updateProductImageUrl(newImgURL: string, itemId: string, imgNum: number) {
    this.fbProvider.updateProductImageURL(newImgURL, itemId, 2);
  }

  getProductsByUser(userId: string){
    return this.productsByUser = this.fbProvider.getAllProductsFromUser(userId);
  }
}
