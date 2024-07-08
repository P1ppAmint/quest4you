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
      <img ngSrc="assets/images/logo.png" width="180" height="180" alt="Quest4You Logo" priority/>
      <ul class="sidebar-links">
        <li><a [routerLink]="['/home']" [routerLinkActive]="['is-active']">HOME</a></li>
        <li><a [routerLink]="['/quests']" [routerLinkActive]="['is-active']">QUESTS</a></li>
        <li><a [routerLink]="['/player-type']" [routerLinkActive]="['is-active']">PLAYER TYPE</a></li>
        <li><a [routerLink]="['/library']" [routerLinkActive]="['is-active']">LIBRARY</a></li>
        <li><a [routerLink]="['/social']" [routerLinkActive]="['is-active']">SOCIAL</a></li>
        <li><a [routerLink]="['/account']" [routerLinkActive]="['is-active']">ACCOUNT</a></li>
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
    text-decoration: none;

    &:hover {
      color: #FFE1B4;
    }

    &.is-active{
      color: #FFB951;
    }

  }

  .sidebar-wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: black;
    gap: 10pt;
    padding: 20pt 0;
    box-sizing: border-box;
  }

  `
})
export class SidebarComponent {

}
