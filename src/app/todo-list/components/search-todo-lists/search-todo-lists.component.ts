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

  private selectedValue: SearchTodoListsRecordResponseDto | undefined;

  public constructor(
    public vm: SearchTodoListsViewModel,
  ) {}

  public ngOnInit(): void {
      this.vm.search();
  }

  public get selected(): SearchTodoListsRecordResponseDto {
    return this.selectedValue ?? new SearchTodoListsRecordResponseDto(0, '', '');
  }

  public set selected(record: SearchTodoListsRecordResponseDto) {
    this.selectedValue = record;
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
    this.selected = { ...record, };
    this.modelRef.show();
  }

  public onDeleteOkPressed(): void {
    this.vm.delete(this.selected);
  }
}
