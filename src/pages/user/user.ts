import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,  ModalController, LoadingController, ViewController} from 'ionic-angular';

import { Storage } from '@ionic/storage'
import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'
import { HeadfacePage } from '../headface/headface';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage  extends BaseUI {

  headface: string = "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg?1547178979710";
  nickname: string = '加载中...';
  errorMsg: string;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public storage: Storage,
     public api: ApiProvider,
     public loadingCtr: LoadingController,
     public toastCtrl: ToastController,
     public ViewCtr: ViewController,
     public ModalCtrl: ModalController 
    ) {
      super()
  }

  ionViewDidEnter() {
    this.loadUserPage()
  }
  loadUserPage() {
    // this.storage.remove('UserId')
    this.storage.get('UserId').then(val=>{
      if(val!=null){
        // 加载用户数据
        let loading = super.showLoading(this.loadingCtr, '加载中...')
        this.api.getUserInfo(val).subscribe((userinfo:any)=>{
          this.nickname = userinfo['UserNickName']
          this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf()
        })
        
        loading.dismiss()
      }
    },
    error => this.errorMsg = <any>error
    )
  }
  updateNickName() {
    this.storage.get('UserId').then(userid=>{
      if(userid!=null){
        let loading = super.showLoading(this.loadingCtr, '修改中...')
        this.api.updateNickName(userid, this.nickname).subscribe(data=>{
          if(data['Status'] == 'OK') {
            loading.dismiss()
            super.showToast(this.toastCtrl, '昵称修改成功')
          }else{
            loading.dismiss()
            super.showToast(this.toastCtrl, data['StatusContent'])
          }
        },error => this.errorMsg = <any>error)
      }
    })
   
  }
  logout() {
    this.storage.remove("UserId");
    this.ViewCtr.dismiss()
  }
  modifyAvatar() {
    this.navCtrl.push(HeadfacePage)
  }

}
