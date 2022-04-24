import { AfterViewInit, Component,
         TemplateRef, ViewChild,   } from '@angular/core';

declare var bootstrap: any;

const TOAST_DELAY   = 10000;
const TOAST_OPTIONS = {
  animation: true,
  autohide : true,
  delay    : TOAST_DELAY,
};
const TOAST_SHOW    = 'show';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: [
    './toast.component.scss',
  ],
})
export class ToastComponent implements AfterViewInit {
  private titleValue  : undefined | string;
  private messageValue: undefined | string;

  @ViewChild('toast')
  private toastElement: undefined | TemplateRef<any>;
  private toast       : any;

  public get title(): string {
    return this.titleValue ?? '';
  }

  public get message(): string {
    return this.messageValue ?? '';
  }

  public ngAfterViewInit(): void {
    this.toast = bootstrap.Toast(this.toastElement, TOAST_OPTIONS);
  }

  public show(): void {
    this.toast.toast(TOAST_SHOW);
  }
}
