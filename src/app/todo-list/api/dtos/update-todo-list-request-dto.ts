export class UpdateTodoListRequestDto {
  public constructor(
    public todoListId : string = '',
    public title      : string = '',
    public description: string = '',
  ) {}
}
