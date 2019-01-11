import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    // console.log('Hello RestProvider Provider');
  }

  /**
   *全局获取HTTP请求
   *
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
    .pipe(
      map((val:any) => JSON.parse(val)),
      tap(_ => console.log('fetched')),
      // catchError(this.handleError2('error',[]))
    )
  }
  // feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get'
  
  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register'
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login'
  private apiUrlUserInfo= 'https://imoocqa.gugujiankong.com/api/account/userinfo'
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname'

  // question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save'
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&num=10' //@todo 有问题这里不完整
  private apiUrlGetQuestion = 'https://imoocqa.gugujiankong.com/api/question/get'
  private apiUrlAnswer = 'https://imoocqa.gugujiankong.com/api/question/answer'

login(mobile,password):Observable<string[]>{
  return this.getUrlReturn(this.apiUrlLogin+'?mobile='+mobile+'&password='+password)
}

register(mobile,nickname,password):Observable<string[]>{
  return this.getUrlReturn(this.apiUrlRegister+'?mobile='+mobile+ '&nickname='+ nickname +'&password='+password)
}
getUserInfo(userId) :Observable<string[]>{
  return this.getUrlReturn(this.apiUrlUserInfo+'?userid='+userId)
}
updateNickName(userId, nickname) :Observable<string[]>{
  return this.getUrlReturn(this.apiUrlUpdateNickName+'?userid='+userId + '&nickname=' + nickname)
}

  private extractData(res) { 
    let body = res.body;
    return JSON.parse(body) || {};
  }

  // @todo 
  private handleError(error: any) {
    let errMsg: string;
    
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    
    console.log(error)
    console.error(errMsg)
    return Observable.throw(errMsg)
  }
  private handleError2<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return Observable.throw(error)
    };
  }
}
