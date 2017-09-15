import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the AzureConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var WindowsAzure: any;
@Injectable()
export class AzureConnectionProvider {

  private client:any;
  private table: any;

  constructor(public http: Http) {
    console.log('Hello AzureConnectionProvider Provider');
  }
  
  public createClientConnection(){
    this.client = new WindowsAzure.MobileServiceClient("https://uc-marketplace.azurewebsites.net");
  }

  public getTable(tablename: String){
    this.table = this.client.getTable(tablename);
  }

}
