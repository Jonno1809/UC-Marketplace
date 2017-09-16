import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Nav, Platform } from 'ionic-angular'
import 'rxjs/add/operator/map';

/*
  Generated class for the AzureConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/ 
declare var WindowsAzure: any;

@Injectable()
export class AzureConnectionProvider {
  
  private client: any;
  private table: any;
  private item :any;
  
  constructor(public http: Http, platform:Platform) {
    console.log('Hello AzureConnectionProvider Provider');
    platform.ready().then(() => {
      this.createClientConnection();
    });
  }
  
  public createClientConnection(){
    try{
      this.client = new WindowsAzure.MobileServiceClient("https://uc-marketplace.azurewebsites.net");
      console.log("Successfully connected to Azure");
    }
    catch (err){
      console.log(err);
    }
  }

  public getTable(tablename: String){
    try{
      this.table = this.client.getTable(tablename);
    }
    catch (err) {
      console.log(err);
    }
  }

  public insert(item){
    try{
      this.client.getTable('todoitem').insert(item);
      console.log("Successfully added item: " + item);
    }
    catch(err){
      console.log(err);
    }
  }

}
