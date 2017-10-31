import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


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
  students: any;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,

    public navCtrl: NavController, public navParams: NavParams) {
    this.cards = new Array(10);

    this.students = [{ name: 'Jonno', course: "IT" },
    { name: 'Jack', course: "Law" },
    { name: 'Tri', course: "Software Engineering" },
    { name: 'Stephen', course: "Business" }];

  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data.email && data.uid) {
        this.toast.create({
          message: 'Welcome to UC-Market Place, ' + data.email,
          duration: 3000
        }).present();
      } else {
        this.toast.create({
          message: 'Could not find authentication details',
          duration: 3000
        }).present();
      }
      console.log(data.email);
    });
  }

}
