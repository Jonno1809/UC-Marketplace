import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user'
import { AngularFireAuth } from 'angularfire2/auth';
import {ItemPage} from '../item/item';
import {SignupPage} from '../signup/signup';
/**
 * Generated class for the LogindetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logindetail',
  templateUrl: 'logindetail.html',
  providers: [AngularFireAuth],
})
export class LogindetailPage {
 user = {} as User;
 constructor(private afAuth: AngularFireAuth,
  public navCtrl: NavController, public navParams: NavParams) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogindetailPage');
  }
  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(ItemPage);
        console.log(result);
      }  
    }
    catch (e) {
      console.error(e);
      console.log(e);
    }

  }
  signupTapped(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SignupPage    );}
}
