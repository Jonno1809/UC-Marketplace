import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  private imagesSrc: string[] = new Array();
  private numImages: number = 0;
  
  constructor(public http: Http, private camera: Camera) {
    console.log('Hello ImageProvider Provider');
  }

  public openPhotoGallery(): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 100,
      targetWidth: 1920,
      targetHeight: 1920,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions)
      .then(file_uri => {
        this.imagesSrc.push(file_uri);
        this.numImages = this.imagesSrc.length;
      },
      err => console.log(err));
  }

  public getImagesForUpload(): string[] {
    return this.imagesSrc;
  }

  public getNumImages() {
    return this.numImages;
  }
}
