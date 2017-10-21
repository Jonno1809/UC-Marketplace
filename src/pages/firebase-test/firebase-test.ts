import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';

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

  product: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fbProvider: FirebaseProvider) {
    // this.getItem('-KuObmXeYx0-zxj1pbVm');

  }

  //Runs when the view has loaded, see https://ionicframework.com/docs/api/navigation/NavController/
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirebaseTestPage');
  }

  // Runs when the page is about to enter and become the active page, see https://ionicframework.com/docs/api/navigation/NavController/ (there's heaps of these!)
  // Place anything you want to run when the page loads here (you can probably also put it in the constructor) 
  ionViewWillEnter() {
    this.getItem('-KuObmXeYx0-zxj1pbVm');
  }

  /**
   * Fetches a product and stores it for use.
   * @param itemId the id of the item
   */
  getItem(itemId: string) {
    return this.product = this.fbProvider.getItem(itemId);
  }
}
