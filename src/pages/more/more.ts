import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

import { LoginPage } from '../login/login'

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
export class MorePage {

  constructor(public navCtrl: NavController, 
                      public navParams: NavParams,
                      public ModalCtrl: ModalController ) {
  }

  showModal(){
    let modal = this.ModalCtrl.create(LoginPage)
    modal.present()
  }

}
