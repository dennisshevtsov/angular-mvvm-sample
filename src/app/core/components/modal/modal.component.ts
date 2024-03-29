import { AfterViewInit } from '@angular/core';
import { Component     } from '@angular/core';
import { ElementRef    } from '@angular/core';
import { EventEmitter  } from '@angular/core';
import { Input         } from '@angular/core';
import { Output        } from '@angular/core';
import { TemplateRef   } from '@angular/core';
import { ViewChild     } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements AfterViewInit {
  @Input()
  public title: TemplateRef<any> | null = null;

  @Input()
  public body: TemplateRef<any> | null = null;

  @Output()
  public readonly ok: EventEmitter<any>;

  @Output()
  public readonly cancel: EventEmitter<any>;

  @ViewChild('modal')
  private modalRef!: ElementRef<HTMLDivElement>;
  private modal: any;

  public constructor() {
    this.ok = new EventEmitter<any>();
    this.cancel = new EventEmitter<any>();
  }

  public ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(this.modalRef.nativeElement);
  }

  public show(): void {
    this.modal.show();
  }

  public onOkClicked(): void {
    this.modal.hide();
    this.ok.emit();
  }

  public onCancelClicked(): void {
    this.modal.hide();
    this.cancel.emit();
  }
}
