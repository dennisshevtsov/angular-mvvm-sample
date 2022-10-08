export class UncompleteTodoListTaskRequestDto {
  public constructor(
    public todoListId    : string,
    public todoListTaskId: string,
  ) { }
}
