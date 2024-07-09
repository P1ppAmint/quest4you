import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <img class="background" ngSrc="assets/images/loading_screen_background.png" width="1440" height="1024" alt ="Background"/>
    <div class="logo-container">
      <img class="logo" ngSrc="assets/images/logo.png" alt="Logo" width="200" height="200"/>
    </div>
  `,
  styles: `
    .background {
      position: absolute;
      width: 100%;
      height: max-content;
    }

    .logo-container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  `
})
export class LoadingScreenComponent {

}
