import { AfterViewInit } from '@angular/core';
import { Component     } from '@angular/core';
import { OnDestroy     } from '@angular/core';
import { OnInit        } from '@angular/core';
import { ViewChild     } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ParamMap       } from '@angular/router';

import { Subscription } from 'rxjs';

import { AppClock                     } from 'src/app/core';
import { MILLISECONDS_IN_HOUR         } from 'src/app/core';
import { MILLISECONDS_IN_MENUTE       } from 'src/app/core';
import { ToastsComponent              } from 'src/app/core';
import { TodoListTaskLinks            } from 'src/app/core';
import { TodoListTaskNavigator        } from 'src/app/core';
import { TODO_LIST_ROUTE_ID_PARAMETER } from 'src/app/core';

import { TodoListTaskComponent    } from 'src/app/todo-list-task/components/todo-list-task';
import { AddTodoListTaskViewModel } from './add-todo-list-task.view-model';

@Component({
  templateUrl: './add-todo-list-task.component.html',
  styleUrls: [
    './add-todo-list-task.component.scss',
  ],
  providers: [
    AddTodoListTaskViewModel,
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    }
  ],
})
export class AddTodoListTaskComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('task')
  private task!: TodoListTaskComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  private error: undefined | string;

  public constructor(
    public readonly vm: AddTodoListTaskViewModel,

    private readonly subsription: Subscription,

    private readonly clock    : AppClock,
    private readonly route    : ActivatedRoute,
    private readonly links    : TodoListTaskLinks,
    private readonly navigator: TodoListTaskNavigator,
  ) { }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.task.todoListId);
  }

  public ngOnInit(): void {
    const observer = {
      next: (params: ParamMap) => {
        const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

        if (todoListId) {
          this.vm.task.todoListId     = todoListId;

          const now   = this.clock.now();
          const step  = 15 * MILLISECONDS_IN_MENUTE;
          const start = now - (now % step) + step;
          const end   = start + MILLISECONDS_IN_HOUR;

          this.vm.task.period.day     = now;
          this.vm.task.period.start   = start;
          this.vm.task.period.end     = end;
          this.vm.task.period.fullDay = true;
        }
        else {
          this.error = 'An error occured.';
        }
      },
    };

    this.subsription.add(
      this.route.paramMap.subscribe(observer));
  }

  public ngAfterViewInit(): void {
    if (this.error) {
      this.toasts.error(this.error)
    }
  }

  public ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  public onOkPressed(): void {
    this.task.validateForm();

    if (this.task.form.valid) {
      const observer = {
        complete: () => this.navigator.navigateToUpdateTodoListTask(
          this.vm.task.todoListId, this.vm.task.todoListTaskId),
        error   : () => this.toasts.error('An error occured.'),
      };

      this.subsription.add(this.vm.add().subscribe(observer));
    }
  }
}
