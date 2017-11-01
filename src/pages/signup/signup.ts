import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { UserDetail } from '../../models/userdetail'
import { AngularFireAuth } from "angularfire2/auth";

import { FirebaseApp } from 'angularfire2'; // for methods
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AngularFireAuth]
})
export class SignupPage {
  user = {} as User;
  public userUID: any;
  userdetail = {} as UserDetail;
  validEmailDomain;

  constructor(private afAuth: AngularFireAuth, public http: Http,
    public db: AngularFireDatabase,
    public fbe: FirebaseApp,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  async signupTapped(user: User) {
    let emailDomain = user.email.split('@');
    if (emailDomain[1] != 'uni.canberra.edu.au') {
      this.validEmailDomain = false;
      this.invalidEmailAlert();
    } else {
      this.validEmailDomain = true;
      try {
        const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        console.log(result);
        this.navCtrl.setRoot(LoginPage);
      }
      catch (e) {
        console.error(e);
      }
    }
  }
  
  addUser(userdetail: UserDetail) {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.db.object('/users/' + user.uid).set(this.userdetail);
    })
  }
  invalidEmailAlert() {
    const alert = this.alertCtrl.create({
      title: 'Invalid Email',
      subTitle: 'Email must be from @uni.canberra.edu.au',
      buttons: ['Ok']
    });
    alert.present();
  }
}