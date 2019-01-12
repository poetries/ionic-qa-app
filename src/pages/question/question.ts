import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController  } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'
import { Storage } from '@ionic/storage'

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage  extends BaseUI {

  title: string;
  content: string;
  errorMessage: any;

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  dismiss() {
    this.ViewCtr.dismiss()
  }
  submitQuestion() {
    this.storage.get('UserId').then(userId=>{
      if(userId !==null) {
        let loading = super.showLoading(this.loadingCtr, '加载中...')
        this.api.saveQuestion(userId, this.title, this.content).subscribe(data=>{
          if(data['Status'] == 'OK') {
            loading.dismissAll()
            this.dismiss()
          }else{
            loading.dismissAll()
            super.showToast(this.toastCtrl, data['StatusContent'])
          }
        },error=>this.errorMessage = <any>error)
      }else {
        super.showToast(this.toastCtrl, '请登录后再发布提问...')
      }
    })
  }

}
