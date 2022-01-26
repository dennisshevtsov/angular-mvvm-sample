import { Component, Input, TemplateRef, } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: [
    './page.component.scss',
  ],
})
export class PageComponent {
  @Input()
  public actions: TemplateRef<any> | null = null;

  @Input()
  public body: TemplateRef<any> | null = null;
}
