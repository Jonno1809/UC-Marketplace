import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogindetailPage } from './logindetail';

@NgModule({
  declarations: [
    LogindetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LogindetailPage),
  ],
})
export class LogindetailPageModule {}
