export class UpdateTodoListRequestDto {
  public constructor(
    public todoListId : number | string = 0,
    public title      : string = '',
    public description: string = '',
  ) {}
}
