import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController  } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'

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

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public ViewCtr: ViewController,
      public loadingCtr: LoadingController,
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

}
