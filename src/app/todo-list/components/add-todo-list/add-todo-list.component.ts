import { Component, OnDestroy,
         OnInit, ViewChild,      } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { FormComponentBase,
         PageComponent,
         TodoListLinks,
         TodoListNavigator,    } from 'src/app/core';
import { AddTodoListViewModel, } from './add-todo-list.view-model';

@Component({
  templateUrl: './add-todo-list.component.html',
  styleUrls: [
    './add-todo-list.component.scss',
  ],
})
export class AddTodoListComponent
  extends FormComponentBase
  implements OnInit, OnDestroy {
  @ViewChild('page')
  public page!: PageComponent;

  private subscription: Subscription;

  public constructor(
    public readonly vm: AddTodoListViewModel,

    private readonly fb       : FormBuilder,
    private readonly links    : TodoListLinks,
    private readonly navigator: TodoListNavigator,
  ) {
    super();

    this.subscription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe(value => {
        this.vm.todoList.title = value.title;
        this.vm.todoList.description = value.description;
      })
    );
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    const observer = {
      next: () => this.navigator.navigateToUpdateTodoList(this.vm.todoListId),
      error: () => this.page.showError('An error occured.'),
    };

    this.subscription.add(this.vm.add().subscribe(observer));
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': '',
      'description': ''
    });
  }
}
