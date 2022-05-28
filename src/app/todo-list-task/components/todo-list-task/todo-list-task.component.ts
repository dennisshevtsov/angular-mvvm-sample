import { Component, Input,
         OnDestroy, OnInit,      } from '@angular/core';
import { FormBuilder, FormGroup,
         Validators,             } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { FormComponentBase,            } from 'src/app/core';
import { AddTodoListTaskRequestDto,
         TodoListTaskDateDto,
         UpdateTodoListTaskRequestDto, } from 'src/app/todo-list-task/api';

@Component({
  selector: 'todo-list-task',
  templateUrl: './todo-list-task.component.html',
  styleUrls: [
    './todo-list-task.component.scss',
  ],
})
export class TodoListTaskComponent
  extends FormComponentBase
  implements OnInit, OnDestroy {
  @Input()
  public task!: AddTodoListTaskRequestDto | UpdateTodoListTaskRequestDto;

  private readonly subscription: Subscription;

  public constructor(
    private readonly fb : FormBuilder,
  ) {
    super();

    this.subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.form.setValue({
      'title'      : this.task.title,
      'description': this.task.description,
      'date'       : this.task.date,
    });

    this.subscription.add(
      this.form.valueChanges.subscribe(value => {
        this.task.title       = value.title;
        this.task.description = value.description;
        this.task.date        = value.date;
      })
    );
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title'      : this.fb.control('', Validators.required),
      'description': '',
      'date'       : new TodoListTaskDateDto(),
    });
  }
}
