import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  menuOpen: boolean = false;
  
  @Output() menuOpenOutput = new EventEmitter<boolean>();

  constructor() {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuOpenOutput.emit(this.menuOpen);
  }
}