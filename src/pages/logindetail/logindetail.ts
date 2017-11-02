import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user'
import { AngularFireAuth } from 'angularfire2/auth';
import { ItemPage } from '../item/item';
import { SignupPage } from '../signup/signup';
import { AlertController } from 'ionic-angular';
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
  private user = {} as User;
  private validEmailDomain;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogindetailPage');
  }
  async login(user: User) {
    let emailDomain = user.email.split('@');
    if (emailDomain[1] != 'uni.canberra.edu.au') {
      this.validEmailDomain = false;
      this.invalidEmailAlert();
    } else {
      this.validEmailDomain = true;
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

  }
  signupTapped(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SignupPage);
  }

  invalidEmailAlert() {
    const alert = this.alertCtrl.create({
      title: 'Invalid Email',
      subTitle: 'Email must be from @uni.canberra.edu.au',
      buttons:['Ok']
    });
    alert.present();
  }
}
