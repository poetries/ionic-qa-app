import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { HeadfacePage } from '../pages/headface/headface';
import { QuestionPage } from '../pages/question/question';
import { AnswerPage } from '../pages/answer/answer';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { DetailsPage } from '../pages/details/details';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { UserdatalistPage } from '../pages/userdatalist/userdatalist';
import { NotificationPage } from '../pages/notification/notification';
import { UserCenterPage } from '../pages/usercenter/usercenter';
import { ScanPage } from '../pages/scan/scan';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { ChatserviceProvider } from '../providers/chatservice/chatservice';

// 导入表情emoji
import { EmojiProvider } from '../providers/emoji/emoji';
import { ComponentsModule } from '../components/components.module'

//  插件
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { QRScanner } from '@ionic-native/qr-scanner';

import { RelativetimePipe } from '../pipes/relativetime/relativetime'
import { SettingsProvider } from '../providers/settings/settings';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HeadfacePage,
    QuestionPage,
    AnswerPage,
    ChatdetailsPage,
    DetailsPage,
    DiscoveryPage,
    ChatPage,
    RegisterPage,
    UserPage,
    UserdatalistPage,
    NotificationPage,
    UserCenterPage,
    LoginPage,
    ScanPage,
    TabsPage,
    RelativetimePipe
  ],
  imports: [
  BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回'
    }),
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    RegisterPage,
    UserPage,
    UserdatalistPage,
    NotificationPage,
    UserCenterPage,
    HeadfacePage,
    QuestionPage,
    AnswerPage,
    ChatdetailsPage,
    DetailsPage,
    LoginPage,
    ScanPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    File,
    Camera,
    Transfer,
    FilePath,
    QRScanner,
    ChatserviceProvider,
    EmojiProvider,
    SettingsProvider
  ]
})
export class AppModule {}
