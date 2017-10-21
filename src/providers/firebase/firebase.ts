import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  products: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;

  user: FirebaseObjectObservable<any[]>;
  product: FirebaseObjectObservable<any[]>;

  constructor(public http: Http, 
      public db: AngularFireDatabase,
      public fbe: FirebaseApp)
      // public storage:any, 
      // public storageRef:any, 
      // public productImagesRef:any) 
  {
    console.log('Hello FirebaseProvider Provider');
    // this.storage = firebase.storage();
    // this.storageRef = storage.ref();
    // this.productImagesRef = storageRef.child('Images/products');
  }
  
  public getAllItems() {
    return this.db.list('/products/');
  }
  
  public getAllItemsFromUser(userId: string) {
    return this.db.list('/products/')
  }

  public addItem(itemName: string, itemPrice: number, itemDescription: string, ownerID: string) {
    this.db.list('/products/').push({name: itemName, price: itemPrice, owner: ownerID});
  }

  getItem(itemId: string) {
    return this.db.object('/products/' + itemId);
  }

  /**
   * Kept this method private as we don't particularly want someone to return all users
   */
  private getAllUsers() {
    return this.db.list('/users/');
  }

  private getUser(userId: string) {
    return this.user = this.db.object('/users/$key');
  }

  public addUser(firstName: string, lastName: string, email: string) {
    this.db.list('/users/').push({FirstName: firstName, LastName: lastName, Email: email})
  }

  // public uploadImage(imageString) {

  //   var imageLocation:string = 'E:/Pictures/'; // Testing
  //   var imageName:string = "hyrulian_crest.png"; // Testing
  //   var fullImagePath = imageLocation.concat(imageName); // Testing
  //   imageString = fullImagePath; // Testing

  //   var image = new Blob()

  //   let parseUpload: any; 

  //   return new Promise((resolve, reject) =>
  //   {
  //     parseUpload = this.storageRef.putString(imageString, 'data_url');
      
  //           parseUpload.on('state_changed', (_snapshot) =>
  //           {
  //              // We could log the progress here IF necessary
  //              //console.log('snapshot progess ' + _snapshot);
  //           },
  //           (_err) =>
  //           {
  //              reject(_err);
  //           },
  //           (success) =>
  //           {
  //              resolve(parseUpload.snapshot);
  //           });
  //   });
  // }
}
