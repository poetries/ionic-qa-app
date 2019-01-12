import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, LoadingController, Platform, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage'

import { BaseUI } from '../../common/baseui'
import { ApiProvider } from '../../providers/api/api'

import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

declare var cordova:any; // 导入第三方的库定义到TS项目中

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
    public platform: Platform,
    public actionSheetCtr: ActionSheetController,
    public loadingCtr: LoadingController,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public ModalCtrl: ModalController,
    public camera: Camera,
    public file: File,
    public transfer: Transfer,
    public filePath: FilePath,
    public viewCtr: ViewController,
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
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        },
        {
          text: '使用相机',
          icon: 'md-camera',
          handler: ()=>{
            this.takePicture(this.camera.PictureSourceType.CAMERA)
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
        quality: 100, // 图片质量
        sourceType: sourceType,
        saveToPhotoAlbum: false, // 是否保存拍摄的照片到相册中去
        correctOrientation: true, // 是否纠正拍摄的照片方向
      }
      // 获取图片的方法
      this.camera.getPicture(options).then(imgPath=>{
        // 特别处理安卓平台的文件路径问题
        if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imgPath).then(filePath=>{
            // 获取正确的路径
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/')+1) // 获取安卓平台下的真实路径
            // 获取正确的文件名
            let currentName = imgPath.substring(imgPath.lastIndexOf('/')+1,imgPath.lastIndexOf('?'))
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName())
          })
        }else{
          // 其他平台写法
           // 获取正确的路径
           let correctPath = imgPath.substr(0, imgPath.lastIndexOf('/')+1)
           // 获取正确的文件名
           let currentName = imgPath.substr(imgPath.lastIndexOf('/')+1)
           this.copyFileToLocalDir(correctPath, currentName, this.createFileName())
        }
      },(err)=>{
        super.showToast(this.toastCtrl, '选择图片出错，请在App中操作或者检查相关权限。')
      })
  }
  // 将获取到图片或者相机拍摄到的图片另存为，用于后期图片上传使用
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory,newFileName).then(success=>{
      this.lastImage = newFileName
    },error=>{
      super.showToast(this.toastCtrl, '存储图片到本地图库出现错误')
    })
  }
  // 为文件生成新的文件名
  createFileName() {
    let d = new Date(),
         n = d.getTime(),
         newFileName = n + '.jpg'; // 拼接文件名
    
    return newFileName
  }
  // 处理图片的路径为可以上传的路径
  pathForImage(img) {
    if(img === null) {
      return ''
    }else{
      return cordova.file.dataDirectory + img
    }
  }
  uploadImage() {
    let url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface'
    let targetPath = this.pathForImage(this.lastImage)
    let filename = this.userId + '.jpg' // 定义上传后的文件名
    // fileTransfer上传的参数
    let opitons = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'fileName': filename,
        'userid': this.userId
      }
    }
    const fileTransfer:TransferObject = this.transfer.create()
    let loading = super.showLoading(this.loadingCtr, '上传中...')

    // 开始上传
    fileTransfer.upload(targetPath, url, opitons).then(data=>{
      loading.dismiss()
      super.showToast(this.toastCtrl, '图片上传成功')
      // 页面看清弹窗提示后进行页面关闭
      setTimeout(() => {
        this.viewCtr.dismiss()
      }, 3000);
    },error=>{
      loading.dismiss()
      super.showToast(this.toastCtrl, '图片上传发生错误，请重试。')
    })
  }
}
