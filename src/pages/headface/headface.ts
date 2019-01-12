import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController, ModalController, LoadingController,  ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage'

import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'

import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage   extends BaseUI {

  public userId: string;
  public errorMessage: any;
  public lastImage: string = null;

  constructor(
    public navCtrl: NavController, 
    public storage: Storage,
    public actionSheetCtr: ActionSheetController,
    public loadingCtr: LoadingController,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public ModalCtrl: ModalController,
    public camera: Camera,
    public file: File,
    public transfer: Transfer,
    public filePath: FilePath,
    public navParams: NavParams) {
      super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadfacePage');
  }
  ionViewDidEnter() {
    this.storage.get('UserId').then(userId=>{
      if(userId!=null){
        this.userId = userId
      }
      })
  }
  presentActionSheet(){
    let actionSheet = this.actionSheetCtr.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库中选择',
          icon: 'md-aperture',
          handler: ()=>{

          }
        },
        {
          text: '使用相机',
          icon: 'md-camera',
          handler: ()=>{
            
          }
        },
        {
          text: '取消',
          icon: 'md-close',
          role: 'cancel'
        }
      ]
    })
    actionSheet.present()
  }
  takePicture(sourceType) {
      // 定义相机参数
      let options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false, // 是否保存拍摄的照片到相册中去
        correctOrientation: true, // 是否纠正拍摄的照片方向
      }
      // 获取图片的方法
  }
}
