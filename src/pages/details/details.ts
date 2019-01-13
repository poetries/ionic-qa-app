import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController  } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'
import { Storage } from '@ionic/storage'

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
   this.id = this.navParams.get('id')
   this.loadQuestions(this.id)
  }
  loadQuestions(id) {
    let loading = super.showLoading(this.loadingCtr, '加载中...')
    this.api.getQuestion(this.id).subscribe(d=>{
      this.questions = d
      this.answers = d['Answers']
    },error=>this.errorMessage = <any>error)
  }

}
