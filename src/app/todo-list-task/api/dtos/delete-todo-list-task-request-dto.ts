export class DeleteTodoListTaskRequestDto {
  public constructor(
    public readonly todoListId:     string,
    public readonly todoListTaskId: string,
  ) {}
}
