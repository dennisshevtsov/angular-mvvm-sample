import { Component, Input, TemplateRef, } from '@angular/core';

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

  private errorValue: undefined | string;

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

  public showError(error: string): void {
    this.errorValue = error;
  }

  public clearError(): void {
    this.errorValue = '';
  }
}
