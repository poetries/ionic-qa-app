import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage  extends BaseUI  {

  mobile: any;
  password: any;
  nickname: any;
  errorMessage: any;
  confirmPassword: any; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtr: LoadingController,
    public toastCtrl: ToastController,
    public api: ApiProvider,
    public ViewCtr: ViewController
  ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  dismiss() {
    this.ViewCtr.dismiss() 
  }
  gotoLogin() {
    this.navCtrl.pop()
  }
  doRegister() {
    if(!(/^1[34578]\d{9}$/.test(this.mobile))){
      return  super.showToast(this.toastCtrl, '手机号码格式不正确!')
    }
    if(!this.nickname) {
      return  super.showToast(this.toastCtrl, '昵称不能为空')
    }
    if(this.nickname && this.nickname.length<=3) {
      return  super.showToast(this.toastCtrl, '昵称不能小于三位')
    }
    if(!this.password) {
      return  super.showToast(this.toastCtrl, '密码不能为空')
    }
    if(this.password != this.confirmPassword) {
       return super.showToast(this.toastCtrl, '输入密码不一致')
    }else {
      const loading = super.showLoading(this.loadingCtr, "注册中...")

      this.api.register(this.mobile, this.nickname, this.password).subscribe(
        data => {
          if(data['Status'] =='OK'){
            // 注册成功
            loading.dismiss()
            super.showLoading(this.loadingCtr, "注册成功")
            this.dismiss()
          }else{
            loading.dismiss()
            super.showToast(this.toastCtrl, data['StatusContent'])
          }
      },
      error => this.errorMessage = <any>error )
    }
    

  }
}
