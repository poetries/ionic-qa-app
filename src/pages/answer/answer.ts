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
    console.log('ionViewDidLoad AnswerPage');
  }
  dismiss() {
    this.ViewCtr.dismiss()
  }

}
