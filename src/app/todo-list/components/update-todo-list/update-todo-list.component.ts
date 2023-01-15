import { AfterViewInit } from '@angular/core';
import { Component     } from '@angular/core';
import { OnDestroy     } from '@angular/core';
import { OnInit        } from '@angular/core';
import { ViewChild     } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ParamMap       } from '@angular/router';

import { mergeMap     } from 'rxjs';
import { Subscription } from 'rxjs';
import { throwError   } from 'rxjs';

import { RouteCleaner                 } from 'src/app/core';
import { ToastsComponent              } from 'src/app/core';
import { TodoListLinks                } from 'src/app/core';
import { TodoListTaskLinks            } from 'src/app/core';
import { TODO_LIST_ROUTE_ID_PARAMETER } from 'src/app/core';

import { TodoListComponent       } from '../todo-list';
import { UpdateTodoListViewModel } from './update-todo-list.view-model';

@Component({
  templateUrl: './update-todo-list.component.html',
  styleUrls: [
    './update-todo-list.component.scss',
  ],
  providers: [
    UpdateTodoListViewModel,
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class UpdateTodoListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('todoList')
  private todoList!: TodoListComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  private added: boolean;

  public constructor(
    public readonly vm: UpdateTodoListViewModel,

    private readonly sub: Subscription,

    private readonly route            : ActivatedRoute,
    private readonly routeCleaner     : RouteCleaner,
    private readonly todoListLinks    : TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {
    this.added = false;
  }

  public get backLink(): any[] {
    return this.todoListLinks.searchTodoListsLink();
  }

  public get addTodoListTaskLink(): any[] {
    return this.todoListTaskLinks.addTodoListTaskLink(
      this.vm.todoList.todoListId);
  }

  public ngOnInit(): void {
    const project = (params: ParamMap) => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

      if (todoListId) {
        this.vm.todoList.todoListId = todoListId;

        return this.vm.initialize();
      }

      return throwError(() => new Error());
    };

    const observer = {
      error: () => this.toasts.error('An error occured.'),
    };

    this.sub.add(
      this.route.paramMap.pipe(mergeMap(project))
                         .subscribe(observer));

    this.sub.add(
      this.route.fragment.subscribe((fragment) => {
        if (fragment === 'added') {
          this.routeCleaner.clean();
          this.added = true;
        }
      }));
  }

  public ngAfterViewInit(): void {
    if (this.added) {
      this.toasts.info('The TODO list is added.');
    }
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onOkPressed(): void {
    this.todoList.validateForm();

    if (this.todoList.form.valid) {
      const observer = {
        complete: () => this.toasts.info('The TODO list was updated.'),
        error   : () => this.toasts.error('An error occured.'),
      };

      this.sub.add(this.vm.update().subscribe(observer));
    }
  }
}
