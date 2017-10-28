import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ItemPage} from '../item/item';
import{LoginPage} from '../login/login';
import {User} from '../../models/user';
import{UserDetail} from '../../models/userdetail'
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
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
  providers:[AngularFireAuth]
})
export class SignupPage {
user = {}as User;
public userUID : any;
userdetail = {} as UserDetail;
  constructor(private afAuth:AngularFireAuth,public http: Http, 
    public db: AngularFireDatabase,
    public fbe: FirebaseApp,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  async signupTapped(user : User) {
    try{
    const result =this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
    console.log(result);
    this.navCtrl.setRoot(LoginPage);
    }
    catch(e){

      console.error(e);
      }}   
    
      addUser(userdetail:UserDetail){
       
        this.afAuth.authState.take(1).subscribe(auth =>{
           
         this.db.object('/users'+auth.uid).set(this.userdetail)
        })
    
        }}