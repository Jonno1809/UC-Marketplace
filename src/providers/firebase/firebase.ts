import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  products: FirebaseListObservable<any[]>;

  constructor(public http: Http, public db: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }
  
  getItems() {
    return this.db.list('/products/');
  }

  addItems(){
    this.db.list('/products/').push({name:"Item1", owner:"Jonathan Simmons"});
  }
}
