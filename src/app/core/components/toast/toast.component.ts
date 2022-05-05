import { AfterViewInit, ChangeDetectorRef,
         Component, ElementRef,
         EventEmitter, OnDestroy, Output,
         ViewChild,                        } from '@angular/core';

import { fromEvent, Subscription, } from 'rxjs';

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

  private isErrorValue: undefined | boolean;
  private messageValue: undefined | string;

  @ViewChild('toast')
  private toastElement!: ElementRef<HTMLDivElement>;
  private toast        : any;

  public constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.changeDetectorRef.detach();
    this.hidden = new EventEmitter<void>();
  }

  public get isError(): boolean {
    return this.isErrorValue ?? false;
  }

  public get message(): string {
    return this.messageValue ?? '';
  }

  public info(message: string): void {
    this.isErrorValue = false;
    this.messageValue = message;

    this.changeDetectorRef.detectChanges();
  }

  public error(message: string): void {
    this.isErrorValue = true;
    this.messageValue = message;

    this.changeDetectorRef.detectChanges();
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
