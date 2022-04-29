import { Component, ElementRef, ViewChild, } from '@angular/core';

declare var bootstrap: any;

const TOAST_DELAY   = 10000;

const TOAST_OPTIONS = {
  animation: true,
  autohide : true,
  delay    : TOAST_DELAY,
};

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: [
    './toast.component.scss',
  ],
})
export class ToastComponent {
  private recordsValue: { title: string, message: string }[] = [];

  @ViewChild('container')
  private containerElement!: ElementRef<HTMLDivElement>;

  public get records(): { title: string, message: string }[] {
    return this.recordsValue;
  }

  public show(title: string, message: string): void {
    const index = this.records.push({
      title  : title,
      message: message,
    });

    const toastElements = this.containerElement.nativeElement.children;
    const toastElement = toastElements[0];

    console.log(this.containerElement.nativeElement);
    console.log(toastElements);
    console.log(toastElement);

    const toast = bootstrap.Toast.getOrCreateInstance(
      toastElement, TOAST_OPTIONS);

    toast.show();
  }
}
