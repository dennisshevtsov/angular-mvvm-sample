import { Component, OnInit,        } from '@angular/core';
import { FormBuilder, FormGroup,   } from '@angular/forms';
import { ActivatedRoute, ParamMap, } from '@angular/router';

import { mergeMap, throwError, } from 'rxjs';

import { AppNavigator,
         FormComponentBase,
         TodoListLinks,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { UpdateTodoListViewModel,      } from './update-todo-list.view-model';

@Component({
  templateUrl: './update-todo-list.component.html',
  styleUrls: [
    './update-todo-list.component.scss',
  ],
})
export class UpdateTodoListComponent
  extends FormComponentBase
  implements OnInit {
  public constructor(
    public readonly vm: UpdateTodoListViewModel,

    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly links: TodoListLinks,
    private readonly navigator: AppNavigator,
  ) {
    super();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public ngOnInit(): void {
    const initializer = (params: ParamMap) => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

      if (todoListId) {
        this.vm.todoList.todoListId = todoListId;

        return this.vm.initialize();
      }

      return throwError(() => new Error(''));
    };
    const observer = {
      error: () => this.navigator.navigateToError(),
    };

    this.route.paramMap.pipe(mergeMap(initializer))
                       .subscribe(observer);

    this.form.valueChanges.subscribe(value => {
      this.vm.todoList.title = value.title;
      this.vm.todoList.description = value.description;
    });
  }

  public onOkPressed(): void {
    this.vm.update();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': '',
      'description': ''
    });
  }
}
