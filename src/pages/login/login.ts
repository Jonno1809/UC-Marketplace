import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'
import { SignupPage } from '../signup/signup'
import { LogindetailPage } from '../logindetail/logindetail';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginTapped(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(LogindetailPage);
  }
  signupTapped(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SignupPage);
  }

}
