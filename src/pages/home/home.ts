import { Component } from '@angular/core';
import { NavController,ModalController, LoadingController,  ToastController, Tabs} from 'ionic-angular';
import { QuestionPage } from '../question/question'
import { ApiProvider } from '../../providers/api/api'
import { BaseUI } from '../../common/baseui'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage   extends BaseUI {

  constructor(
    public navCtrl: NavController,
    public loadingCtr: LoadingController,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public ModalCtrl: ModalController 
    ) {
      super()
  }
  gotoQuestion() {
    let modal = this.ModalCtrl.create(QuestionPage)
    modal.present()
  }
  gotoChat() {
    this.selectTab(2)
  }
  selectTab(index:number) {
    let t:Tabs = this.navCtrl.parent;
    t.select(index)
  }

}
