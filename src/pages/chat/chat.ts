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
      userid: '15474322092123',
      username: 'poetries',
      avatar: 'https://blog.poetries.top/images/avatar.jpg'
    },
    {
      userid: '15474322092123',
      username: '静观流叶',
      avatar: 'http://life.poetries.top/img/me.JPG'
    },
    {
      userid: '15474322092123',
      username: '小明',
      avatar: 'https://blog.poetries.top/images/avatar.jpg'
    },
    {
      userid: '15474322092123',
      username: '小叶',
      avatar: 'http://life.poetries.top/img/me.JPG'
    }
  ]
    this.ChatdetailsPage = ChatdetailsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
