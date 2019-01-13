import { Component } from '@angular/core';
import { NavController,ModalController, LoadingController,  ToastController, Tabs} from 'ionic-angular';
import { DetailsPage } from '../details/details'
import { ApiProvider } from '../../providers/api/api'
import { BaseUI } from '../../common/baseui'

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage  extends BaseUI {

  questions: string[];
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
    this.getQuestions()
  }
  getQuestions() {
    let loading = super.showLoading(this.loadingCtr, '加载中...')
    this.api.getQuestionsList().subscribe(data=>{
      this.questions = data
      loading.dismiss()
    },err=>this.errorMessage = <any>err)
  }
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, {id: questionId})
  }
  doRefresh(refresher) {
    this.getQuestions()
    refresher.complete()
  }
}
