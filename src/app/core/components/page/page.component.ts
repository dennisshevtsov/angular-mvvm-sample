import { Component, Input, TemplateRef, } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TodoListLinks, } from 'src/app/core/navigation';

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

  private errorValue  : undefined | string;
  private messageValue: undefined | string;

  public constructor(
    private readonly links: TodoListLinks,
  ) {}

  public get homeLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public get hasError(): boolean {
    return !!this.errorValue;
  }

  public get error(): string {
    return this.errorValue ?? '';
  }

  public get hasMessage(): boolean {
    return !!this.messageValue;
  }

  public get message(): string {
    return this.messageValue ?? '';
  }

  public showError(error: string): void {
    this.errorValue = error;
  }

  public showMessage(message: string): Promise<void> {
    return Promise.resolve(null)
                  .then(() => {
                    this.messageValue = message;
                  });
  }

  public clearError(): void {
    this.errorValue = '';
  }

  public clearMessage(): void {
    this.messageValue = '';
  }

  public clear(): void {
    this.clearError();
    this.clearMessage();
  }
}
