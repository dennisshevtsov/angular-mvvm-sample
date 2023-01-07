import { Component } from '@angular/core';
import { Input     } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit    } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup   } from '@angular/forms';
import { Validators  } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { FormComponentBase } from 'src/app/core';

import { AddTodoListRequestDto    } from 'src/app/todo-list/api';
import { UpdateTodoListRequestDto } from 'src/app/todo-list/api';

interface TodoListProps {
  title      : string;
  description: string;
}

type TodoListFormScheme = {
  [K in keyof TodoListProps]: FormControl<TodoListProps[K] | null>;
}

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: [
    './todo-list.component.scss',
  ],
})
export class TodoListComponent
  extends FormComponentBase<TodoListFormScheme>
  implements OnInit, OnDestroy {
  private todoListValue!: AddTodoListRequestDto | UpdateTodoListRequestDto;

  private readonly subscription: Subscription;

  public constructor(private readonly fb: FormBuilder) {
    super();

    this.subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe(value => {
        this.todoList.title       = value.title ?? '';
        this.todoList.description = value.description ?? '';
      }));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @Input()
  public set todoList(value: AddTodoListRequestDto | UpdateTodoListRequestDto) {
    this.todoListValue = value;
    this.form.setValue({
      'title'      : value.title,
      'description': value.description,
    });
  }

  public get todoList(): AddTodoListRequestDto | UpdateTodoListRequestDto {
    return this.todoListValue;
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title'      : this.fb.control('', Validators.required),
      'description': '',
    });
  }
}
