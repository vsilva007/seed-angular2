import {Injectable} from '@angular/core';

@Injectable()
export class ThemePreloaderService {

  private _selector:string = 'preloader';
  private _element:HTMLElement;

  constructor() {
    this._element = document.getElementById(this._selector);
  }

  public displayed(): boolean{
    return (this._element.style['display'] == 'block');
}

  public show():void {
    this._element.style['display'] = 'block';
  }

  public hide(delay:number = 0):void {
    setTimeout(() => {
      this._element.style['display'] = 'none';
    }, delay);
  }
}
