import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { FormComponentBase,                  } from 'src/app/core';
import { AddTodoListDayTaskRequestDto,
         AddTodoListPeriodTaskRequestDto,
         TodoListTaskDateDto,
         UpdateTodoListDayTaskRequestDto,
         UpdateTodoListPeriodTaskRequestDto, } from 'src/app/todo-list-task/api';

@Component({
  selector: 'todo-list-task',
  templateUrl: './todo-list-task.component.html',
  styleUrls: [
    './todo-list-task.component.scss',
  ],
  providers: [
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class TodoListTaskComponent
  extends FormComponentBase
  implements OnInit, OnDestroy {
  @Input()
  public task!: AddTodoListDayTaskRequestDto      |
                AddTodoListPeriodTaskRequestDto   |
                UpdateTodoListDayTaskRequestDto   |
                UpdateTodoListPeriodTaskRequestDto;

  public constructor(
    private readonly subscription: Subscription,
    private readonly fb : FormBuilder,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form.setValue({
      'title'      : this.task.title,
      'description': this.task.description,
      'period'     : this.buildPeriod(),
    });

    this.subscription.add(
      this.form.valueChanges.subscribe(value => {
        this.task.title       = value.title;
        this.task.description = value.description;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title'      : this.fb.control('', Validators.required),
      'description': '',
      'period'     : new TodoListTaskDateDto(),
    });
  }

  private buildPeriod(): TodoListTaskDateDto {
    console.log(this.task);
    if (this.task instanceof AddTodoListDayTaskRequestDto ||
        this.task instanceof UpdateTodoListDayTaskRequestDto) {
      return new TodoListTaskDateDto(this.task.date, true);
    }

    return new TodoListTaskDateDto(undefined, false, this.task.begin, this.task.end);
  }
}
