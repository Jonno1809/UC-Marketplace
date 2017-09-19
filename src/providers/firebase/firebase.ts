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
  users: FirebaseListObservable<any[]>;

  constructor(public http: Http, config: any,db: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
    this.users = db.list('/users');
  }

}
