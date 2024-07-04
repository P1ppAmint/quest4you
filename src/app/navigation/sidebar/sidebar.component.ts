import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive
  ],
  template: `
    <section class="sidebar-wrapper">
      <img ngSrc="assets/images/logo.png" width="180" height="180"/>
      <ul class="sidebar-links">
        <li><a [routerLink]="" [routerLinkActive]="['is-active']">HOME</a></li>
        <li><a [routerLink]="['/quests']" [routerLinkActive]="['is-active']">QUESTS</a></li>
        <li><a [routerLink]="['/playertype']" [routerLinkActive]="['is-active']">PLAYERTYPE</a></li>
        <li><a [routerLink]="['/library']" [routerLinkActive]="['is-active']">LIBRARY</a></li>
        <li><a>SOCIAL</a></li>
        <li><a>ACCOUNT</a></li>
      </ul>
    </section>
  `,
  styles: `
  .sidebar-links{
    display: flex;
    flex-direction: column;
    padding: 24pt;
    gap: 16pt;
    list-style-type: none;
  }



  .sidebar-links li a{
    color: white;

  }
  .sidebar-links li a.is-active {
    color: #FFB951;
  }

  .sidebar-wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 256pt;
    background: black;
    gap: 10pt;
    padding: 20pt 0;
    box-sizing: border-box;
  }

  `
})
export class SidebarComponent {

}
