import { Component, OnDestroy,
         OnInit, ViewChild,        } from '@angular/core';
import { FormBuilder, FormGroup,   } from '@angular/forms';
import { ActivatedRoute, ParamMap, } from '@angular/router';

import { Subscription, } from 'rxjs';

import { FormComponentBase,
         PageComponent,
         TodoListTaskLinks,
         TodoListTaskNavigator,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { AddTodoListTaskViewModel,     } from './add-todo-list-task.view-model';

@Component({
  templateUrl: './add-todo-list-task.component.html',
  styleUrls: [
    './add-todo-list-task.component.scss',
  ],
})
export class AddTodoListTaskComponent
  extends FormComponentBase
  implements OnInit, OnDestroy {
  @ViewChild('page')
  public page!: PageComponent;

  private subsription: Subscription;

  public constructor(
    public readonly vm: AddTodoListTaskViewModel,

    private readonly fb       : FormBuilder,
    private readonly route    : ActivatedRoute,
    private readonly links    : TodoListTaskLinks,
    private readonly navigator: TodoListTaskNavigator,
  ) {
    super();

    this.subsription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public ngOnInit(): void {
    const observer = {
      next: (params: ParamMap) => {
        const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

        if (todoListId) {
          this.vm.todoListId = todoListId;
        }
      },
      error: () => this.page.showError('An error occured.'),
    };

    this.subsription.add(
      this.route.paramMap.subscribe(observer));

    this.subsription.add(
      this.form.valueChanges.subscribe(value => {
        this.vm.task.title = value.title;
        this.vm.task.description = value.title;
        this.vm.task.date = value.date;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  public onOkPressed(): void {
    const observer = {
      next: () => this.navigator.navigateToUpdateTodoListTask(
        this.vm.todoListId, this.vm.todoListTaskId),
      error: () => this.page.showError('An error occured.'),
    };

    this.subsription.add(this.vm.add().subscribe(observer));
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': '',
      'description': '',
      'date': this.fb.group({
        'day': Date.now(),
        'fullDay': false,
        'start': Date.now(),
        'end': ''
      }),
    });
  }
}
