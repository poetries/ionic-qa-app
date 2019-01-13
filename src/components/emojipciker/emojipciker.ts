import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji'

/**
 * Generated class for the EmojipcikerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'emojipciker',
  templateUrl: 'emojipciker.html'
})

// 继承接口ControlValueAccessor 就要实现接口里面的方法
export class EmojipcikerComponent implements ControlValueAccessor{
 
 emojiArray = []
 content: string;
 onChanged: Function;
 onTouched: Function;

  constructor(
    public emojiProvider: EmojiProvider
  ) {
    this.emojiArray = emojiProvider.getEmojis()
  }

  writeValue(obj: any): void {
    this.content = obj
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
}
