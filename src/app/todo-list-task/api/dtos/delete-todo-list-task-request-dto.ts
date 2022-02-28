export class DeleteTodoListTaskRequestDto {
  public constructor(
    public readonly todoListId:     number | string,
    public readonly todoListTaskId: number | string,
  ) {}
}
