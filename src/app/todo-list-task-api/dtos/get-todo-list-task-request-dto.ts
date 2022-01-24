export class GetTodoListTaskRequestDto {
  public constructor(
    public todoListId    : number | string = 0,
    public todoListTaskId: number | string = 0,
  ) { }
}
