import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,} from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji'

/**
 * Generated class for the EmojipcikerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
//实现 EmojipickerComponent 的 providers
export const EMOJI_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojipickerComponent),
  multi: true
}

@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers: [EMOJI_ACCESSOR]
})

// 继承接口ControlValueAccessor 就要实现接口里面的方法
export class EmojipickerComponent implements ControlValueAccessor{
 
 emojiArray = []
 content: string;
 onChanged: Function;
 onTouched: Function;

  constructor(
    public emojiProvider: EmojiProvider
  ) {
    this.emojiArray = emojiProvider.getEmojis()
  }

  // 实现接口
  writeValue(obj: any): void {
    this.content = obj
  }
  // 实现接口
  registerOnChange(fn: any): void {
    this.onChanged = fn
    this.setValue(this.content)
  }
  // 实现接口
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  // 再次处理新的内容赋值以及函数的绑定
  setValue(val:any):any {
    this.content += val
    if(this.content) {
      this.onChanged(this.content)
    }
  }
}
