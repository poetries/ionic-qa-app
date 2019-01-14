import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx'

@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<string>
  constructor(public http: HttpClient) {
    this.theme = new BehaviorSubject('light-theme')
  }
  setActiveTheme(val) {
    this.theme.next(val)
  }
  getActiveTheme() {
    return this.theme.asObservable()
  }
}
