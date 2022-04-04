import { Component, OnDestroy,
         OnInit, ViewChild,        } from '@angular/core';
import { FormBuilder, FormControl,
         FormGroup, Validators,    } from '@angular/forms';
import { ActivatedRoute, ParamMap, } from '@angular/router';

import { Subscription, } from 'rxjs';

import { AppClock, FormComponentBase,
         MILLISECONDS_IN_HOUR,
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
    private readonly clock    : AppClock,
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
        this.vm.task.description = value.description;

        this.vm.task.date.day = value.date.day;
        this.vm.task.date.fullDay = value.date.fullDay;
        this.vm.task.date.start = value.date.start;
        this.vm.task.date.end = value.date.end;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  public onOkPressed(): void {
    this.validateForm();

    if (this.form.valid) {
      const observer = {
        next: () => this.navigator.navigateToUpdateTodoListTask(
          this.vm.todoListId, this.vm.todoListTaskId),
        error: () => this.page.showError('An error occured.'),
      };

      this.subsription.add(this.vm.add().subscribe(observer));
    }
  }

  protected buildForm(): FormGroup {
    const now = this.clock.now();

    return this.fb.group({
      'title': this.fb.control('', Validators.required),
      'description': '',
      'date': this.buildTimePeriodControl(now),
    });
  }

  private buildTimePeriodControl(now: number): FormControl {
    const start = now;
    const end = start + MILLISECONDS_IN_HOUR;

    const controlConfig = {
      'day': now,
      'fullDay': false,
      'start': start,
      'end': end,
    };

    return this.fb.control(controlConfig);
  }
}
