import { Component, ViewChild, ViewContainerRef, } from '@angular/core';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: [
    './toasts.component.scss',
  ],
})
export class ToastsComponent {
  @ViewChild('container')
  private viewContainerRef!: ViewContainerRef;

  public push(title: string, message: string) {}
}
