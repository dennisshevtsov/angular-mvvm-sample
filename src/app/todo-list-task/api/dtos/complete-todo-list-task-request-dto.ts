export class CompleteTodoListTaskRequestDto {
  public constructor(
    public todoListId    : string = '',
    public todoListTaskId: string = '',
  ) { }
}
