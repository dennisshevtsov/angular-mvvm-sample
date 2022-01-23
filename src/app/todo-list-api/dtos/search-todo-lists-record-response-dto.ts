export class SearchTodoListsRecordResponseDto {
  public constructor(
    public todoListId: number | string,
    public title: string,
    public description: string,
  ) {}
}
