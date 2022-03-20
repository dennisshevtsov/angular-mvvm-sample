import { Component, OnDestroy,
         OnInit, ViewChild,      } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute,         } from '@angular/router';

import { Subscription, } from 'rxjs';

import { FormComponentBase,
         PageComponent,
         TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,
         TODO_LIST_TASK_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { UpdateTodoListTaskRequestDto,      } from 'src/app/todo-list-task/api';
import { UpdateTodoListTaskViewModel,       } from './update-todo-list-task.view-model';

@Component({
  templateUrl: './update-todo-list-task.component.html',
  styleUrls: [
    './update-todo-list-task.component.scss',
  ],
})
export class UpdateTodoListTaskComponent
  extends  FormComponentBase
  implements OnInit, OnDestroy {
  @ViewChild('page')
  private page!: PageComponent;

  private subscription: Subscription;

  public constructor(
    public readonly vm: UpdateTodoListTaskViewModel,

    private readonly fb   : FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly links: TodoListTaskLinks,
  ) {
    super();

    this.subscription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);
        const todoListTaskId = params.get(TODO_LIST_TASK_ROUTE_ID_PARAMETER);

        if (todoListId && todoListTaskId) {
          this.vm.todoListId = todoListId;
          this.vm.todoListTaskId = todoListTaskId;

          const observer = {
            next: () => {
              this.form.setValue({
                'title': this.vm.task.title,
                'description': this.vm.task.description,
                'date': {
                  'day': this.vm.task.date.day,
                  'fullDay': this.vm.task.date.fullDay,
                  'start': this.vm.task.date.start,
                  'end': this.vm.task.date.end
                },
              });
            },
            error: () => this.page.showError('An error occured.'),
          };

          this.subscription.add(
            this.vm.initialize().subscribe(observer));

          this.subscription.add(
            this.form.valueChanges.subscribe(value => {
              this.vm.task = new UpdateTodoListTaskRequestDto(
                this.vm.todoListId,
                this.vm.todoListTaskId,
                value.title,
                value.deacription,
                value.date,
              );
            })
          );
        }
      })
    );
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    const observer = {
      error: () => this.page.showError('An error occured.'),
    };

    this.subscription.add(this.vm.update().subscribe(observer));
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
