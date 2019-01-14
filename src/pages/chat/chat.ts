import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatdetailsPage } from '../chatdetails/chatdetails'

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  users: object[];
  ChatdetailsPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.users = [
    {
      userid: '5c37377c647eb41acc32c4a0',
      username: 'poetries',
      avatar: 'https://blog.poetries.top/images/avatar.jpg'
    },
    {
      userid: '15474322092123',
      username: '静观流叶',
      avatar: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg'
    },
    {
      userid: '5c37377c647eb41acc32c4a0',
      username: '小明',
      avatar: 'https://blog.poetries.top/images/avatar.jpg'
    },
    {
      userid: '15474322092123',
      username: '小叶',
      avatar: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg'
    }
  ]
    this.ChatdetailsPage = ChatdetailsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
