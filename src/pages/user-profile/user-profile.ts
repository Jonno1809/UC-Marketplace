import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LogindetailPage } from '../logindetail/logindetail';

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
  private user: {};
  private userImageURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fbProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  ionViewWillEnter() {
    let userID = this.fbProvider.getSignedInUID();
    this.user = this.fbProvider.getUser(userID);
    this.userImageURL = this.fbProvider.getSignedInUserPhoto();
  }

  goToLogin() {
    this.navCtrl.push(LogindetailPage);
  }
}
