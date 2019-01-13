import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController  } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'
import { Storage } from '@ionic/storage'

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage  extends BaseUI {

  errorMessage: any;
  id: string;
  content: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ViewCtr: ViewController,
    public loadingCtr: LoadingController,
    public storage: Storage,
    public api: ApiProvider,
    public toastCtrl: ToastController,
  ) {
    super()
    this.id = navParams.get('id') // 接收传递过来的参数
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }
  dismiss() {
    this.ViewCtr.dismiss()
  }
  submitAnswer() {
    this.storage.get('UserId').then(userId=>{
      if(userId !==null) {
        let loading = super.showLoading(this.loadingCtr, '提交中...')
        this.api.answer(userId, this.id, this.content).subscribe(data=>{
          if(data['Status'] == 'OK') {
            loading.dismissAll()
            this.dismiss()
          }else{
            loading.dismissAll()
            super.showToast(this.toastCtrl, data['StatusContent'])
          }
        },error=>this.errorMessage = <any>error)
      }else {
        super.showToast(this.toastCtrl, '请登录后再发布回答...')
      }
    })
  }

}
