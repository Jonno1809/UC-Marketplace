import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AzureConnectionProvider} from '../../providers/azure-connection/azure-connection';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tableName:String = 'People_table';

  constructor(public navCtrl: NavController, public azConnectProv: AzureConnectionProvider) {
    
  }
  public connectToAzure(){
    this.azConnectProv.createClientConnection();
    this.azConnectProv.getTable(this.tableName);
  }
}
