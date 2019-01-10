import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'
import { Storage } from '@ionic/storage'
import { RegisterPage } from '../register/register'

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
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    const loading = super.showLoading(this.loadingCtr, "登录中...")

    this.api.login(this.mobile, this.password).subscribe(
      data => {
        if(data['Status'] =='OK'){
          // 处理登录成功
          loading.dismiss()
          this.storage.set('UserId', data['UserId']) 
          this.dismiss()
        }else{
          loading.dismiss()
          super.showToast(this.toastCtrl, data['StatusContent'])
        }
    },
    error => this.errorMessage = <any>error )
  }

  dismiss() {
    this.ViewCtr.dismiss()
  }
  pushRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

}
