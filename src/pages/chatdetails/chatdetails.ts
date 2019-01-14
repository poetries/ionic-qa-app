import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput } from 'ionic-angular';
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

  // 和其他用户聊天
  chatUserName: string;
  chatUserId: string;

  // 自己的信息
  userId: string;
  userName: string;
  userImgUrl: string;

  editorMessage: string;
  isOpenEmojiPicker: boolean;
  messageList: ChatMessage[] = [];
  errorMsg: string;
  @ViewChild(Content) content:Content;
  @ViewChild('chatInput') messageInput:TextInput; // 通过#chatInput定义 获取模板的dom

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public api: ApiProvider,
    public chatService: ChatserviceProvider
  ) {
    this.chatUserName = navParams.get('username')
    this.chatUserId = navParams.get('userid')
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then(val=>{
      if(val!=null){
        // 加载用户数据
        this.api.getUserInfo(val).subscribe((userinfo:any)=>{
          this.userId = '5c37377c647eb41acc32c4a0'
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
  // 发送消息
  sendMessage() {
    if(!this.editorMessage.trim()) {
      return;
    }
    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: this.userId,
      username: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,
      time: Date.now(),
      message: this.editorMessage,
      status: 'pending'
    }
    this.messageList.push(messageSend)
    this.scrollToBottom()

    this.editorMessage = ''
    if(!this.isOpenEmojiPicker) { // 判断聊天输入框是否打开
      this.messageInput.setFocus()
    }
    //发送消息并改变消息的状态
    this.chatService.sendMessage(messageSend)
      .then(() => {
        let index = this.getMessageIndex(id);
        if (index !== -1) {
          this.messageList[index].status = 'success';
        }
      });

  }
  getMessageIndex(id: string) {
    return this.messageList.findIndex(e => e.messageId === id);
  }
  // 光标移到textarea上
  focus() {
    this.isOpenEmojiPicker = false; // 关闭emoji选择框
    this.content.resize() // 重新计算尺寸 布局
    this.scrollToBottom() // 消息滚动到底部
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
    setTimeout(() => {
      if(this.content.scrollToBottom) {
        this.content.scrollToBottom()
      }
    }, 400);
  }

}
