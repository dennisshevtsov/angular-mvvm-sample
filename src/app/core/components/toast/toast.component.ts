import { AfterViewInit, Component,
         ElementRef, Input, ViewChild, } from '@angular/core';

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
export class ToastComponent implements AfterViewInit {
  private titleValue  : undefined | string;
  private messageValue: undefined | string;

  @ViewChild('toast')
  private toastElement!: ElementRef<HTMLDivElement>;
  private toast        : any;

  public get title(): string {
    return this.titleValue ?? '';
  }

  @Input()
  public set title(value: string) {
    this.titleValue = value;
  }

  public get message(): string {
    return this.messageValue ?? '';
  }

  @Input()
  public set message(value: string) {
    this.messageValue = value;
  }

  public ngAfterViewInit(): void {
    this.toast = new bootstrap.Toast(
      this.toastElement.nativeElement, TOAST_OPTIONS);
  }

  public show(): void {
    this.toast.show();
  }
}
