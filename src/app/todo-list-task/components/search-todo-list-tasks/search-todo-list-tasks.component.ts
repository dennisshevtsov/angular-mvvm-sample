import { Component, OnInit, ViewChild, } from '@angular/core';

import { ModalComponent,                       } from 'src/app/core';
import { SearchTodoListTasksRecordResponseDto, } from 'src/app/todo-list-task/api';
import { SearchTodoListTasksViewModel,         } from './search-todo-list-tasks.view-model';

@Component({
  templateUrl: './search-todo-list-tasks.component.html',
  styleUrls: [
    './search-todo-list-tasks.component.scss',
  ],
})
export class SearchTodoListTasksComponent implements OnInit {
  @ViewChild('modal')
  private modalRef!: ModalComponent;

  private recordValue: SearchTodoListTasksRecordResponseDto | undefined;

  public constructor(
    public readonly vm: SearchTodoListTasksViewModel,
  ) {}

  public ngOnInit(): void {
    this.vm.search();
  }

  public get selected(): SearchTodoListTasksRecordResponseDto {
    return this.recordValue ?? new SearchTodoListTasksRecordResponseDto(0);
  }

  public set selected(record: SearchTodoListTasksRecordResponseDto) {
    this.recordValue = record;
  }

  public get backLink(): string {
    return '';
  }

  public get addTodoListTaskLink(): string {
    return '';
  }

  public updateTodoListTaskLink(
    todoListTaskId: number | string) : string {
    return '';
  }

  public onCompletedChanged(
    record: SearchTodoListTasksRecordResponseDto): void {
    this.vm.complete();
  }

  public onDeletePressed(
    record: SearchTodoListTasksRecordResponseDto): void {
    this.selected = { ...record, };
    this.modalRef.show();
  }

  public onDeleteOkPressed(): void {
    this.vm.delete(this.selected);
    this.vm.search();
  }
}
