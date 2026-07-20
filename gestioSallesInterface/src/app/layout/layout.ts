import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IgxIconComponent } from 'igniteui-angular';
import {
  IgxNavigationDrawerComponent,
  IGX_NAVIGATION_DRAWER_DIRECTIVES
} from 'igniteui-angular/navigation-drawer';

@Component({
  selector: 'app-layout',
  imports: [...IGX_NAVIGATION_DRAWER_DIRECTIVES,RouterOutlet,RouterLink,RouterLinkActive ,],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
   isSidebarOpen = signal(false);
 
  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }
 
  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
