import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { FormComponentBase,        } from 'src/app/core';
import { AddTodoListRequestDto,
         UpdateTodoListRequestDto, } from 'src/app/todo-list/api';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: [
    './todo-list.component.scss',
  ],
})
export class TodoListComponent
  extends FormComponentBase
  implements OnInit, OnDestroy {
  @Input()
  public todoList!: AddTodoListRequestDto | UpdateTodoListRequestDto;

  private readonly subscription: Subscription;

  public constructor(private readonly fb: FormBuilder) {
    super();

    this.subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.form.setValue({
      'title'      : this.todoList.title,
      'description': this.todoList.description,
    });

    this.subscription.add(
      this.form.valueChanges.subscribe(value => {
        this.todoList.title = value.title;
        this.todoList.description = value.description;
      }));
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
    });
  }
}
