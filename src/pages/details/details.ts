import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController, ToastController  } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'
import { Storage } from '@ionic/storage'
import { AnswerPage } from '../answer/answer'

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage  extends BaseUI {

  id: string;
  questions: string[];
  answers: string[];
  errorMessage: any;
  isFavourite: boolean;
  userId: string;
  isMyQuestion: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ViewCtr: ViewController,
    public loadingCtr: LoadingController,
    public storage: Storage,
    public ModalCtrl: ModalController,
    public api: ApiProvider,
    public toastCtrl: ToastController,
  ) {
    super()
}

  ionViewDidLoad() {
   this.id = this.navParams.get('id')
   this.loadQuestions(this.id)
  }
  loadQuestions(id) {
    this.storage.get('UserId').then(userId=>{
      if(userId !==null){
        let loading = super.showLoading(this.loadingCtr, '加载中...')
        this.api.getQuestionWithUser(this.id, userId).subscribe(d=>{
          this.userId = userId
          this.questions = d
          this.answers = d['Answers']
          this.isFavourite = d['IsFavourite']
          this.isMyQuestion = d['OwnUserId'] == userId
        },error=>this.errorMessage = <any>error)
      }
     })
   
  }
  saveFavourite() {
    let loading = super.showLoading(this.loadingCtr, '请求中...')
    this.api.saveFavourite(this.id, this.userId).subscribe(d=>{
      if(d['Status'] == 'OK') {
        loading.dismiss()
        super.showToast(this.toastCtrl, this.isFavourite ? '取消关注成功': '关注问题成功')
        this.isFavourite = !this.isFavourite
      }
    },error=>this.errorMessage = <any>error)
  }
  showAnswerPage() {
    let modal = this.ModalCtrl.create(AnswerPage, {
      id: this.id
    })
    modal.present()
  }
}
