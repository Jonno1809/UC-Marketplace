import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LogindetailPage } from '../logindetail/logindetail';
import { AddItemPage } from '../add-item/add-item';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  private user: any;
  private userImageURL: string;

  private userProducts: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fbProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  ionViewWillEnter() {
    if (this.fbProvider.getCurrentlySignedInUser()!=null){
      this.getUserDetails();
    }
  }

  getUserDetails() {
    let userID = this.fbProvider.getSignedInUID();
    this.user = this.fbProvider.getUser(userID);
    this.userImageURL = this.fbProvider.getSignedInUserPhoto();
    this.userProducts = this.fbProvider.getAllProductsFromUser(userID);
  }

  goToLogin() {
    this.navCtrl.push(LogindetailPage);
  }
  goToAddItem() {
    this.navCtrl.push(AddItemPage);
  }

  // goToProduct(productID) {
  //   this.navCtrl.push(itemdetailpage)
  // }
}
