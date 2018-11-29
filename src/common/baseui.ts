import { Loading, LoadingController, ToastController, Toast} from 'ionic-angular';

export abstract class BaseUI {
    constructor() {

    }

    protected showLoading(loadingCtr: LoadingController, message: string): Loading {
        let loader = loadingCtr.create({
            content: message,
            dismissOnPageChange: true
        })
        loader.present()
        return loader
    }
    protected showToast(toastCtrl: ToastController, message: string):Toast {
        let toast = toastCtrl.create({
            message,
            duration: 3000,
            position: 'bottom'
        })
        toast.present()
        return toast
    }
}