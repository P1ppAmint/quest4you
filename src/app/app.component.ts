import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "./navigation/sidebar/sidebar.component";
import {NgOptimizedImage} from "@angular/common";
import {LoadingScreenComponent} from "./loading-screen/loading-screen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NgOptimizedImage, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'quest4you';
}
