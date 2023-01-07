import { Injectable } from '@angular/core';

import { map        } from 'rxjs';
import { Observable } from 'rxjs';
import { of         } from 'rxjs';
import { switchMap  } from 'rxjs';

import { DeleteTodoListRequestDto         } from 'src/app/todo-list/api';
import { SearchTodoListsRecordResponseDto } from 'src/app/todo-list/api';
import { SearchTodoListsRequestDto        } from 'src/app/todo-list/api';
import { TodoListService                  } from 'src/app/todo-list/api';

@Injectable()
export class SearchTodoListsViewModel {
  private selectedValue : undefined | SearchTodoListsRecordResponseDto;
  private todoListsValue: undefined | SearchTodoListsRecordResponseDto[];

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get hasSelection(): boolean {
    return !!this.selected.todoListId;
  }

  public get selected(): SearchTodoListsRecordResponseDto {
    return this.selectedValue ?? (this.selectedValue = new SearchTodoListsRecordResponseDto('', '', ''));
  }

  public set selected(record: SearchTodoListsRecordResponseDto) {
    this.selectedValue = record;
  }

  public get todoLists(): SearchTodoListsRecordResponseDto[] {
    return this.todoListsValue ?? [];
  }

  public search(): Observable<void> {
    return this.service.searchTodoList(new SearchTodoListsRequestDto())
                       .pipe(map(responseDtos => {
                         this.todoListsValue = responseDtos;
                       }));
  }

  public delete() : Observable<void> {
    if (this.hasSelection) {
      const request = new DeleteTodoListRequestDto(this.selected.todoListId);

      return this.service.deleteTodoList(request)
                         .pipe(switchMap(() => this.search()));
    }

    return of();
  }
}
