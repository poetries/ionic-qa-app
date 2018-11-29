import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  mobile: any;
  password: any;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtr: ViewController,
    public loadingCtr: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController
  ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    const loading = super.showLoading(this.loadingCtr, "登录中...")
    this.rest.login(this.mobile, this.password)
    .subscribe(
      f => {
        if(f['Status'] =='OK'){

        }else{
          loading.dismiss()
          super.showToast(this.toastCtrl, f['StatusContent'])
        }
    },
    error => this.errorMessage = <any>error )
  }

  dismiss() {
    this.ViewCtr.dismiss()
  }

}
