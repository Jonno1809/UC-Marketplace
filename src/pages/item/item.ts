import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
})
export class ItemPage {
  
  cards: any;
  category: string = 'gear';
  students : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cards = new Array(10);
    
    this.students= [{name : 'Jonno', course:"IT"},
    {name : 'Jack', course:"Law"},
    {name : 'Tri', course:"Software Engineering"},
    {name : 'Stephen', course:"Business"}];
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }

}
