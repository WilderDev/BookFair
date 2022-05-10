import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // Inject packages
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  // Bind the class "show" to a variable "isOpen"
  @HostBinding('class.show') isOpen = false;

  // Listen for a "click" on the dropdown directive
  @HostListener('click') toggleOpen() {
    // 1. Toggle the "isOpen" variable
    this.isOpen = !this.isOpen;

    // 2. Grab the div with class of "dropdown-menu" and store in variable
    const dropdownMenu =
      this.elRef.nativeElement.querySelector('.dropdown-menu');

    // 3. Conditionally add/remove the "show" class to the div of "dropdown-menu"
    if (this.isOpen) {
      this.renderer.addClass(dropdownMenu, 'show');
    } else {
      this.renderer.removeClass(dropdownMenu, 'show');
    }
  }
}
