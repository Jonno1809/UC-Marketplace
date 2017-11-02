import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import{AngularFireAuth} from 'angularfire2/auth';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ImageProvider } from '../../providers/image/image';
import { EmailComposer } from '@ionic-native/email-composer';


/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
  providers: [AngularFireAuth],
})
export class ItemPage {

  cards: any;
  category: string = 'gear';
  students : any;
  private product: FirebaseObjectObservable<any>; // Single item
  private products: FirebaseListObservable<any[]>; // List of items

  private productsByUser: FirebaseListObservable<any[]>;
  private productImages: FirebaseListObservable<any[]>;

  private imagesForUpload: number = 0;

  constructor(private afAuth:AngularFireAuth,private toast : ToastController, private emailComposer: EmailComposer,
    public navCtrl: NavController, public navParams: NavParams, public fbProvider: FirebaseProvider, public imgProvider: ImageProvider) {
    this.cards = new Array(10);

    this.students = [{ name: 'Jonno', course: "IT" },
    { name: 'Jack', course: "Law" },
    { name: 'Tri', course: "Software Engineering" },
    { name: 'Stephen', course: "Business" }];

  }

  ionViewDidLoad() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user.email && user.uid) {
        this.toast.create({
          message: 'Welcome to UC-Market Place, ' + user.email,
          duration: 3000
        }).present();
      } else {
        this.toast.create({
          message: 'Could not find authentication details',
          duration: 3000
        }).present();
      }
      console.log(user.email);
    });
  }

  sendEmail() {
    let email = {
      to: 'seller@testing.com',
      cc: 'admin@uc-marketplace.com',
      subject: 'UC Marketplace',
      body: 'Hey mate, is this item still available?',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

  // Runs when the page is about to enter and become the active page, see https://ionicframework.com/docs/api/navigation/NavController/ (there's heaps of these!)
  // Place anything you want to run when the page loads here (you can probably also put it in the constructor)
  ionViewWillEnter() {
    this.getProduct('-KuObmXeYx0-zxj1pbVm');
    this.getAllProducts();
    this.getProductsByUser('Tim Allen');
    this.getProductImages('-KuOh05_CRwaxf-LnIjY');
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

  updateProductImageUrl(newImgURL: string, itemId: string, imgNum: number) {
    this.fbProvider.updateProductImageURL(newImgURL, itemId, imgNum);
  }

  getProductsByUser(userId: string){
    return this.productsByUser = this.fbProvider.getAllProductsFromUser(userId);
  }

  // Could be useful for when putting all images in an <ion-slides> or something
  getProductImages(productId: string) {
    return this.productImages = this.fbProvider.getProductImageURLs(productId);
  }

}
