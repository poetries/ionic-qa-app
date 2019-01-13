import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatdetailsPage } from './chatdetails';

@NgModule({
  declarations: [
    ChatdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatdetailsPage),
  ],
})
export class ChatdetailsPageModule {}
