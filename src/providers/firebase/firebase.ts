import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import 'firebase/storage';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseProvider {

  private imageProductStorageRef = firebase.storage().ref('/images/products/');

  constructor(public http: Http, public db: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
    
    firebase.database.enableLogging(function(message) {
      console.log("[FIREBASE]", message);
    });

    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        console.log("[FB CONNECTION VERIFICATION] connected");
      } else {
        console.log("[FB CONNECTION VERIFICATION] not connected");
      }
    });
    
    // this.storage = firebase.storage();
    // this.storageRef = storage.ref();
    // this.productImagesRef = storageRef.child('Images/products');
  }
  
  public getAllProducts() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        console.log("[FB CONNECTION VERIFICATION] connected");
      } else {
        console.log("[FB CONNECTION VERIFICATION] not connected");
      }
    });
    return this.db.list('/products/');
  }
  
  public getAllProductsFromUser(userId: string) {
    return this.db.list('/products/', {query: {orderByChild:'owner', equalTo: userId}});
  }
  
  /**
   * Fetches all details of a product
   * 
   * @param itemId Id string of the product to get
   */
  public getProduct(itemId: string) {
    return this.db.object('/products/' + itemId);
  }

  public getProductImageURLs(productId: string) {
    return this.db.list('/products/'+ productId + '/images/');
  }

  /**
   * Adds a product to the products database and adds a reference to the owners record.
   * 
   * @param itemName the name of the product
   * @param itemPrice the price of the product
   * @param itemDescription the description of the product
   * @param imageURLs an array of all image download urls for the product
   * @param ownerID the id of the owner of the product
   */
  public addProduct(itemName: string, itemPrice: number, itemDescription: string, imageURLs: string[], ownerID: string) {
    let itemId = this.db.list('/products/').push(
      { 
        name: itemName,
        price: itemPrice,
        description: itemDescription,
        owner: ownerID
      }).key;

    for (let i = 0; i < imageURLs.length; i++) {
      let imgNumString = 'imageURL' + i;
      this.db.object('/products/' + itemId + '/images/').update({[imgNumString]: imageURLs[i]});
    }

    this.db.object('/users/' + ownerID + '/products/').update({[itemId]: true});
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

  public updateProductImageURL(newImgURL: string, itemId: string, imgNum: number) {
    let imgNumString = 'imageURL' + imgNum;
    this.db.object('/products/' + itemId + '/images/').update({[imgNumString]: newImgURL});
  }

  public removeProductImageURL(itemId: string, imgNumber: number) {
    this.db.object('/products/' + itemId + '/images/imageURL' + imgNumber).remove();
  }

  public removeAllProductImageURLs(itemId: string) {
    this.db.object('/products/' + itemId + '/images/').remove();
  }

  public replaceAllProductImageURLs(itemId: string, imageUrls: string[]) {
    this.db.object('/products/' + itemId + '/images/').set(imageUrls);
  }

  public updateProductOwner(newOwnerId: string, itemId: string) {
    this.db.object('/products/' + itemId).update({ownerId: newOwnerId});
  }

  // Might update this so that each user has their own folder of images
  public uploadImage(imageSrcBase64String: string) {
    let uploadTask = this.imageProductStorageRef.child('-product-' + new Date().getTime().toString()).putString(imageSrcBase64String, 'base64', { contentType: 'image/jpeg' });
    
    return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (uploadTask.snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.stack) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log("You are unauthorised to access this object.");
        case 'storage/canceled':
          // User canceled the upload
          console.log("Upload cancelled.");
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          console.log("Unknown error.");
      }
    }, () => {
      // Upload completed successfully, now we can get the download URL
      //  this.imageUrl = uploadTask.snapshot.downloadURL;
       console.log('Upload is complete');
    });
  }
  
  // NOTE: Really hard to use this on other components due to async nature
  // May not even need to use this, more likely to call getProduct() which already has a url
  public getImageUrl(imgName: string): Promise<any> {
    return this.imageProductStorageRef.child(imgName).getDownloadURL().then((url) => {
      // If request successful, stuff in here fires
      // this.imageUrl = url;
    }).catch(function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object_not_found':
            // File doesn't exist
            console.log("err 1");
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log("err 2");
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log("err 3");
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            console.log("err unknown");
            break;
      }
    });
  }
}
