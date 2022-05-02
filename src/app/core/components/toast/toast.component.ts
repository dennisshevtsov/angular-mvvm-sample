import { AfterViewInit, Component,
         ElementRef, OnDestroy, ViewChild, } from '@angular/core';

declare var bootstrap: any;

const TOAST_DELAY   = 10000;

const TOAST_OPTIONS = {
  animation: true,
  autohide : true,
  delay    : TOAST_DELAY,
};

@Component({
  templateUrl: './toast.component.html',
  styleUrls: [
    './toast.component.scss',
  ],
})
export class ToastComponent implements AfterViewInit, OnDestroy {
  private titleValue  : undefined | string;
  private messageValue: undefined | string;

  @ViewChild('toast')
  private toastElement!: ElementRef<HTMLDivElement>;
  private toast        : any;

  public get title(): string {
    return this.titleValue ?? '';
  }

  public set title(value: string) {
    this.titleValue = value;
  }

  public get message(): string {
    return this.messageValue ?? '';
  }

  public set message(value: string) {
    this.messageValue = value;
  }

  public ngAfterViewInit(): void {
    this.toast = bootstrap.Toast.getOrCreateInstance(
      this.toastElement.nativeElement, TOAST_OPTIONS);

    this.toast.show();
  }

  public ngOnDestroy(): void {
    this.toast.destroy();
  }

  public show(): void {
    this.toast.show();
  }
}
