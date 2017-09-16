import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AzureConnectionProvider } from '../../providers/azure-connection/azure-connection';
import { Nav, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  tableName: String = 'todoitem'; // Testing only
  item: any = { test: 'Item 1', complete: false }; // Testing only

  constructor(public navCtrl: NavController, public azConnectProv: AzureConnectionProvider,public platform:Platform) {
    
  }
  public connectToAzure() {
    this.platform.ready().then(() => {
      this.azConnectProv.createClientConnection();
    });
  }
  
  public testDbInsert() {
    this.connectToAzure();
    this.azConnectProv.insert(this.item,this.tableName);
  }
}