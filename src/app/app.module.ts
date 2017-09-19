import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FirebaseTestPage } from '../pages/firebase-test/firebase-test'
 
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule } from 'angularfire2/database' 
import 'firebase/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AzureConnectionProvider } from '../providers/azure-connection/azure-connection';
import { FirebaseProvider } from '../providers/firebase/firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyBE4UGjfIxWCC25H0L1Q9R4-1eHRhLFj9k",
  authDomain: "uc-marketplace.firebaseapp.com",
  databaseURL: "https://uc-marketplace.firebaseio.com",
  projectId: "uc-marketplace",
  storageBucket: "uc-marketplace.appspot.com",
  messagingSenderId: "559553505676"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FirebaseTestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FirebaseTestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AzureConnectionProvider,
    FirebaseProvider
  ]
})
export class AppModule {}
