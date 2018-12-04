import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { DefaultUrlSerializer, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment, UrlTree } from '@angular/router';

@Directive({
  selector: '[appRouteTransformer]'
})
export class RouteTransformerDirective {

  constructor(private el: ElementRef, private router: Router,  private defaultUrlSerializer: DefaultUrlSerializer) { }

  @HostListener('click', ['$event'])
  public onClick(event) {

    let target = event.target;

    if (target.tagName !== 'A') {
      target = event.target.closest('a');
    }
    console.log(target.tagName);

    if (target.tagName === 'A') {
      console.log('Event2:' + target.getAttribute('href'));
      const tree: UrlTree  = this.router.parseUrl(target.getAttribute('href'));
      const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
      const s: UrlSegment[] = g.segments;
      console.log(tree.root, JSON.stringify(s));
       this.router.navigate([ s[0].path, s[0].parameters ]);
      // this.router.navigate([event.target.getAttribute('href')]);
      event.preventDefault();
    } else {
      return;
    }
  }

/*   @HostListener('click', ['$event.target']) onClick($event) {
    console.log('clicked: ' + $event.getAttribute('data-link'));
    const goRoute = $event.getAttribute('data-link');
    this.router.navigate([goRoute]);

    }
 */
}
