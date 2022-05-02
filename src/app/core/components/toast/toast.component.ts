import { AfterViewInit, Component,
         ElementRef, EventEmitter,
         OnDestroy, Output, ViewChild, } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';

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
  @Output()
  public readonly hidden: EventEmitter<void>;

  private subscription: undefined | Subscription;

  private titleValue  : undefined | string;
  private messageValue: undefined | string;

  @ViewChild('toast')
  private toastElement!: ElementRef<HTMLDivElement>;
  private toast        : any;

  public constructor() {
    this.hidden = new EventEmitter<void>();
  }

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
    const element = this.toastElement.nativeElement;

    this.toast = bootstrap.Toast.getOrCreateInstance(
      element, TOAST_OPTIONS);

    this.subscription = fromEvent(element, 'hidden.bs.toast').subscribe(
      () => this.hidden.emit());

    this.toast.show();
  }

  public ngOnDestroy(): void {
    this.toast.dispose();
    this.subscription?.unsubscribe();
  }
}
