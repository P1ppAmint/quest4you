import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
      <img ngSrc="assets/images/loading-screen-background.png" width="1440" height="1024" alt ="Background"/>
      <img class="logo" ngSrc="assets/images/logo.png" alt="Logo" width="200" height="200"/>
  `,
  styles: ``
})
export class LoadingScreenComponent {

}
