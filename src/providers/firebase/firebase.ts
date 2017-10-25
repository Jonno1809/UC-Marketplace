import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
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
  
  
  public getAllProducts() {
    return this.db.list('/products/');
  }
  
  public getAllProductsFromUser(userId: string) {
    return this.db.list('/products/');
  }
  
  /**
   * Fetches all details of a product
   * 
   * @param itemId Id string of the product to get
   */
  public getProduct(itemId: string) {
    return this.db.object('/products/' + itemId);
  }

  /**
   * Adds a product to the products database.
   * 
   * @param itemName the name of the product
   * @param itemPrice the price of the product
   * @param itemDescription the description of the product
   * @param ownerID the id of the owner of the product
   */
  public addProduct(itemName: string, itemPrice: number, itemDescription: string, ownerID: string) {
    this.db.list('/products/').push({name: itemName, price: itemPrice, description: itemDescription, owner: ownerID});
  }

  /**
   * 
   * @param itemId the Id of the product to delete
   */
  public deleteProduct(itemId) {
    this.db.list('/products/' + itemId).remove();
  }

  /**
   * 
   * @param newName the updated name of the product
   * @param itemId the id of the product to be updated
   */
  public updateProductName(newName: string, itemId: string) {
    this.db.object('/products/' + itemId).update({name: newName});
  }

  public updateProductDescription(newDescription: string, itemId: string) {
    this.db.object('/products/' + itemId).update({description: newDescription});
  }

  public updateProductImageURL(newImgURL: string, itemId: string) {
    this.db.object('/products/' + itemId).update({img_url:newImgURL});
  }

  public updateProductOwner(newOwner: string, itemId: string) {
    this.db.object('/products/' + itemId).update({owner:newOwner});
  }

  /**
   * Fetch all users (NOT TO BE USED)
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
