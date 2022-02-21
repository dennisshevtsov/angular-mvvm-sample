import { Component, OnInit, ViewChild, } from '@angular/core';

import { ModalComponent,                   } from 'src/app/core';
import { SearchTodoListsRecordResponseDto, } from 'src/app/todo-list-api';
import { SearchTodoListsViewModel,         } from './search-todo-lists.view-model';

@Component({
  templateUrl: './search-todo-lists.component.html',
  styleUrls: [
    './search-todo-lists.component.scss',
  ],
})
export class SearchTodoListsComponent implements OnInit {
  @ViewChild('modal')
  public modelRef!: ModalComponent;

  public constructor(
    public vm: SearchTodoListsViewModel,
  ) {}

  public ngOnInit(): void {
      this.vm.search();
  }

  public get addTodoListLink(): string {
    return '';
  }

  public updateTodoListLink(record: SearchTodoListsRecordResponseDto) : string {
    return '';
  }

  public searchTodoListTasksLink(record: SearchTodoListsRecordResponseDto) : string {
    return '';
  }

  public onDeletePressed(record: SearchTodoListsRecordResponseDto): void {
    this.vm.selected = record;
    this.modelRef.show();
  }

  public onDeleteOkPressed(): void {
    this.vm.delete();
  }
}
