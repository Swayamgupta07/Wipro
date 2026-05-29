import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightSalary]', // Using bracket notation means it is used as an attribute directive, e.g. <div appHighlightSalary [salary]="100000">
  standalone: true // Standalone directive so we can import it in any component directly!
})
export class HighlightSalaryDirective implements OnChanges {
  
  // We accept the salary as an @Input. Angular will bind the salary value to this property.
  @Input('salary') salary: number = 0;

  // We inject:
  // 1. ElementRef: To get a reference to the HTML element this directive is attached to.
  // 2. Renderer2: A safe way to manipulate HTML elements without directly touching the browser's DOM API (highly recommended in Angular).
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // ngOnChanges runs whenever the @Input bindings change.
  // This makes our directive highly dynamic—if the employee's salary is edited, the highlight styles update instantly!
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['salary']) {
      this.applyHighlight();
    }
  }

  private applyHighlight(): void {
    const element = this.el.nativeElement;
    
    // First, clear any previously applied salary classes to prevent styling conflicts
    this.renderer.removeClass(element, 'border-salary-high');
    this.renderer.removeClass(element, 'border-salary-mid');
    this.renderer.removeClass(element, 'border-salary-low');

    // Categorize based on salary levels and apply beautiful styling classes:
    // (We will define these visual styling classes inside our main styles.css!)
    if (this.salary >= 90000) {
      // High Earner -> Gold theme
      this.renderer.addClass(element, 'border-salary-high');
    } else if (this.salary >= 60000) {
      // Mid Earner -> Sapphire/Cyan theme
      this.renderer.addClass(element, 'border-salary-mid');
    } else {
      // Standard Earner -> Sleek Slate/Emerald theme
      this.renderer.addClass(element, 'border-salary-low');
    }
  }
}
