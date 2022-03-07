import { Component, OnInit,      } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { FormComponentBase,
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
  implements OnInit {
  private subscription: Subscription | undefined;

  public constructor(
    public readonly vm: AddTodoListViewModel,

    private readonly fb: FormBuilder,
    private readonly links: TodoListLinks,
    private readonly navigator: TodoListNavigator,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      this.vm.todoList.title = value.title;
      this.vm.todoList.description = value.description;
    });
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public onOkPressed(): void {
    const observer = {
      next: () => this.navigator.navigateToUpdateTodoList(this.vm.todoListId),
    };

    this.subscription = this.vm.add().subscribe(observer);
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': '',
      'description': ''
    });
  }
}
