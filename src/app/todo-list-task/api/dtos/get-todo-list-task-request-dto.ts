export class GetTodoListTaskRequestDto {
  public constructor(
    public todoListId    : string = '',
    public todoListTaskId: string = '',
  ) { }
}
