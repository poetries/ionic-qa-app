import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, LoadingController,  ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { BaseUI } from '../../common/baseui'
import { LoginPage } from '../login/login'
import { ApiProvider } from '../../providers/api/api'

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage  extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  public headface: string;
  public userinfo: any;


  constructor(public navCtrl: NavController, 
                      public navParams: NavParams,
                      public storage: Storage,
                      public loadingCtr: LoadingController,
                      public api: ApiProvider,
                      public toastCtrl: ToastController,
                      public ModalCtrl: ModalController ) {
                        super()
  }

  showModal(){
    let modal = this.ModalCtrl.create(LoginPage)
    modal.present()
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
          this.userinfo = userinfo
          this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf()
        })
        
        this.notLogin = false 
        this.logined = true 
        loading.dismiss()
      }else{
        this.notLogin = true 
        this.logined = false
      }
    })
  }

}
