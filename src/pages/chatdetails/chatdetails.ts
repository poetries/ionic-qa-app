import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatserviceProvider, ChatMessage  } from  '../../providers/chatservice/chatservice'
import { Storage } from '@ionic/storage'
import { ApiProvider } from '../../providers/api/api'

/**
 * Generated class for the ChatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {

  chatUserName: string;
  chatUserid: string;

  // 自己的信息
  userId: string;
  userName: string;
  userImgUrl: string;

  editorMessage: any;
  isOpenEmojiPicker: boolean;
  messageList: ChatMessage[] = [];
  errorMsg: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public api: ApiProvider,
    public chatService: ChatserviceProvider
  ) {
    this.chatUserName = navParams.get('username')
    this.chatUserid = navParams.get('userid')
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then(val=>{
      if(val!=null){
        // 加载用户数据
        this.api.getUserInfo(val).subscribe((userinfo:any)=>{
          this.userId = '123321'
          this.userName = userinfo['UserNickName']
          this.userImgUrl = userinfo['UserHeadface'] + '?' + (new Date()).valueOf()
        })
      }
    },error => this.errorMsg = <any>error)
      
    this.getMessages().then(()=>{
      this.scrollToBottom()
    })
  }
  /**
   * 切换表情
   */
  switchEmojiPicker() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker
  }
  sendMessage() {

  }
  focus() {

  }
  /**
   * 获取消息列表
   */
  getMessages() {
    return this.chatService.getMessageList().then(res=>{
      this.messageList = res
    }).catch(err=>console.error(err))
  }
  scrollToBottom():any {

  }

}
