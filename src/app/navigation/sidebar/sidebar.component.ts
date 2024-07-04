import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  template: `
    <section class="sidebar-wrapper">
      <img ngSrc="assets/images/logo.png" width="180" height="180"/>
      <ul class="sidebar-links">
        <li><a routerLink="">HOME</a></li>
        <li><a routerLink="/quests">QUESTS</a></li>
        <li><a routerLink="/playertype">PLAYERTYPE</a></li>
        <li><a routerLink="/library">LIBRARY</a></li>
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

  .sidebar-links li{
    color: white;

  }

  .sidebar-wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 256pt;
    background: black;
    gap: 10pt;
    padding: 20pt 0;
  }

  `
})
export class SidebarComponent {

}
