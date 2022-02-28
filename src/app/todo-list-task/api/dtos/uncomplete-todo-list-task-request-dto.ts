export class UncompleteTodoListTaskRequestDto {
  public constructor(
    public todoListId    : number | string,
    public todoListTaskId: number | string,
  ) { }
}
