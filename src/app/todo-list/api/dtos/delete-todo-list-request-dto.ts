export class DeleteTodoListRequestDto {
  public constructor(
    public todoListId: number | string = 0,
  ) {}
}
