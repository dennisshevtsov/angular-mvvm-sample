import { Component, OnDestroy,
         OnInit, ViewChild,      } from '@angular/core';
import { AbstractControlOptions,
         FormBuilder, FormGroup,
         Validators,             } from '@angular/forms';
import { ActivatedRoute,         } from '@angular/router';

import { Subscription, } from 'rxjs';

import { Formatter, FormComponentBase,
         PageComponent,
         TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,
         TODO_LIST_TASK_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { timePeriodValidator,               } from 'src/app/todo-list-task/validators';
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

    private readonly fb       : FormBuilder,
    private readonly route    : ActivatedRoute,
    private readonly links    : TodoListTaskLinks,
    private readonly formatter: Formatter,
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
                  'day': this.formatter.toLocalDate(this.vm.task.date.day),
                  'fullDay': this.vm.task.date.fullDay,
                  'start': this.formatter.toLocalTime(this.vm.task.date.start),
                  'end': this.formatter.toLocalTime(this.vm.task.date.end),
                },
              });
            },
            error: () => this.page.showError('An error occured.'),
          };

          this.subscription.add(
            this.vm.initialize().subscribe(observer));

          this.subscription.add(
            this.form.valueChanges.subscribe(value => {
              this.vm.task.title = value.title;
              this.vm.task.description = value.deacription;

              this.vm.task.date.day = this.formatter.fromLocalDate(value.date.day);
              this.vm.task.date.fullDay = value.date.fullDay;
              this.vm.task.date.start = this.formatter.fromLocalTime(value.date.start);
              this.vm.task.date.end = this.formatter.fromLocalTime(value.date.end);
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
    this.validateForm();

    if (this.form.valid) {
      const observer = {
        complete: () => this.page.showMessage('The TODO list task was updated.'),
        error: () => this.page.showError('An error occured.'),
      };

      this.subscription.add(this.vm.update().subscribe(observer));
    }
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': this.fb.control('', Validators.required),
      'description': '',
      'date': this.buildTimePeriodGroup(),
    });
  }

  private buildTimePeriodGroup(): FormGroup {
    const controlConfig = {
      'day': this.fb.control('', Validators.required),
      'fullDay': false,
      'start': '',
      'end': '',
    };

    const options: AbstractControlOptions = {
      validators: [
        timePeriodValidator,
      ],
    };

    return this.fb.group(controlConfig, options);
  }
}
