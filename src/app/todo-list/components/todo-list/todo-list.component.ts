import { Component } from '@angular/core';
import { Input     } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit    } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup   } from '@angular/forms';
import { Validators  } from '@angular/forms';

import { Subscription } from 'rxjs';

import { FormComponentBase } from 'src/app/core';
import { FormScheme        } from 'src/app/core';

import { TodoListProps     } from './todo-list.view-model';
import { TodoListViewModel } from './todo-list.view-model';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class TodoListComponent
  extends FormComponentBase<TodoListProps>
  implements OnInit, OnDestroy {
  private todoListValue!: TodoListViewModel;

  public constructor(
    private readonly fb : FormBuilder,
    private readonly sub: Subscription,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.sub.add(
      this.form.valueChanges.subscribe(value => {
        this.todoList.title       = value.title ?? '';
        this.todoList.description = value.description ?? '';
      }));
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @Input()
  public set todoList(value: TodoListViewModel) {
    this.todoListValue = value;
    this.form.setValue({
      title      : value.title,
      description: value.description,
    });
  }

  public get todoList(): TodoListViewModel {
    return this.todoListValue;
  }

  protected buildForm(): FormGroup<FormScheme<TodoListProps>> {
    return this.fb.group({
      title      : this.fb.control('', Validators.required),
      description: this.fb.control(''),
    });
  }
}
