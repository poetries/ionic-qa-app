import { Component } from '@angular/core';
import { NavController,ModalController, LoadingController,  ToastController, Tabs} from 'ionic-angular';
import { QuestionPage } from '../question/question'
import { DetailsPage } from '../details/details'
import { ApiProvider } from '../../providers/api/api'
import { BaseUI } from '../../common/baseui'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage   extends BaseUI {

  feeds: string[];
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtr: LoadingController,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public ModalCtrl: ModalController 
    ) {
      super()
  }
  ionViewDidLoad() {
    this.getFeeds()
  }
  gotoQuestion() {
    let modal = this.ModalCtrl.create(QuestionPage)
    modal.present()
  }
  gotoChat() {
    this.selectTab(2)
  }
  /**
   * 选定指定的tab
   * @param index 
   */
  selectTab(index:number) {
    let t:Tabs = this.navCtrl.parent;
    t.select(index)
  }
  
  getFeeds() {
    let loading = super.showLoading(this.loadingCtr, '加载中...')
    this.api.getFeeds().subscribe(data=>{
      this.feeds = data
      loading.dismiss()
    },err=>this.errorMessage = <any>err)
  }
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, {id: questionId})
  }
}
