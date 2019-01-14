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

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  // question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save'
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10' 
  private apiUrlGetQuestion = 'https://imoocqa.gugujiankong.com/api/question/get'
  private apiUrlGetQuestionWithUser = 'https://imoocqa.gugujiankong.com/api/question/getwithuser' 
  private apiUrlAnswer = 'https://imoocqa.gugujiankong.com/api/question/answer'
  private apiUrlSaveFavourite = 'https://imoocqa.gugujiankong.com/api/question/savefavourite'

  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";
  
  /**
   * 登录
   * @param mobile 
   * @param password 
   */
  login(mobile,password):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlLogin+'?mobile='+mobile+'&password='+password)
  }

  /**
   * 注册
   * @param mobile 
   * @param nickname 
   * @param password 
   */
  register(mobile,nickname,password):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlRegister+'?mobile='+mobile+ '&nickname='+ nickname +'&password='+password)
  }
  /**
   * 获取用户信息
   * @param userId 
   */
  getUserInfo(userId) :Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUserInfo+'?userid='+userId)
  }
  /**
   * 更新昵称
   * @param userId 
   * @param nickname 
   */
  updateNickName(userId, nickname) :Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUpdateNickName+'?userid='+userId + '&nickname=' + nickname)
  }
  /**
   * 保存问题
   * @param userId 
   * @param title 
   * @param content 
   */
  saveQuestion(userId, title, content):Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionSave+'?userid='+userId + '&title=' + title + '&content=' + content)
  }
  /**
   * 获取问题的详情
   * @param id 
   */
  getQuestion(id):Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestion+'?id='+id)
  }
  /**
   * 获取问题详情，传递userId 获取用户是否关注此问题
   * @param questionId 
   * @param userId 
   */
  getQuestionWithUser(questionId, userId):Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser+'?userid='+userId + '&id=' + questionId)
  }
  /**
   * 请求首页feeds
   */
  getFeeds():Observable<string[]> {
    return this.getUrlReturn(this.apiUrlFeeds)
  }
  /**
   * 发现页面问题列表
   */
  getQuestionsList():Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionList)
  }
  /**
   * 取消关注 关注问题
   * @param questionId 
   * @param userId 
   */
  saveFavourite(questionId, userId):Observable<string[]> {
    return this.getUrlReturn(this.apiUrlSaveFavourite+'?userid='+userId + '&questionid=' + questionId)
  }
  /**
   * 提交回答
   * @param questionId 
   * @param userId 
   * @param content 
   */
  answer(userId, questionId, content):Observable<string[]> {
    return this.getUrlReturn(this.apiUrlAnswer+'?userid='+userId + '&questionid=' + questionId + '&content=' + content)
  }
  /**
   * 获取用户的提醒消息
   * 
   * @param {any} userId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserNotifications(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserNotifications + "?userid=" + userId);
  }

  /**
   * 获取用户的相关问题列表
   * 
   * @param {any} userId 
   * @param {any} type  question/answer/favourite
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserQuestionList(userId, type): Observable<string[]> {
    return this.getUrlReturn(this.apiGetUserQuestionList + "?userid=" + userId + "&type=" + type);
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
