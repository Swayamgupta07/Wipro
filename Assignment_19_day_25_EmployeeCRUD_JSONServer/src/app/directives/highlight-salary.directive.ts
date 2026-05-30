import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightSalary]',
  standalone: true
})
export class HighlightSalaryDirective implements OnChanges {
  
  @Input('salary') salary: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['salary']) {
      this.applyHighlight();
    }
  }

  private applyHighlight(): void {
    const element = this.el.nativeElement;
    
    this.renderer.removeClass(element, 'border-salary-high');
    this.renderer.removeClass(element, 'border-salary-mid');
    this.renderer.removeClass(element, 'border-salary-low');

    if (this.salary >= 90000) {
      this.renderer.addClass(element, 'border-salary-high');
    } else if (this.salary >= 60000) {
      this.renderer.addClass(element, 'border-salary-mid');
    } else {
      this.renderer.addClass(element, 'border-salary-low');
    }
  }
}
