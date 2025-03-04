import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appResizeDrawer]',
})
export class ResizeDrawerDirective {
  private startX!: number;
  private startWidth!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
    this.startWidth = this.el.nativeElement.offsetWidth;
    this.renderer.addClass(document.body, 'resizing');
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent): void => {
    const newWidth = this.startWidth - (event.clientX - this.startX);
    this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
  };

  onMouseUp = (): void => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.renderer.removeClass(document.body, 'resizing');
  };
}
