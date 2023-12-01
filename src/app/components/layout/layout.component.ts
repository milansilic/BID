import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  menuIsOpen: boolean;

  constructor() {}

  isMenuOpen(value: boolean) {
    this.menuIsOpen = value;
  }
}