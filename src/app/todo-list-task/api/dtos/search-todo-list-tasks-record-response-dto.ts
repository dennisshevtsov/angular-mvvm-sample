export class SearchTodoListTasksRecordResponseDto {
  public constructor(
    public todoListTaskId: string              = '',
    public completed     : boolean             = false,
    public title         : string              = '',
    public description   : string              = '',
  ) { }
}
