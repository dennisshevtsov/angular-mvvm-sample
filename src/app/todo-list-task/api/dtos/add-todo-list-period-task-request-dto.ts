export class AddTodoListPeriodTaskRequestDto {
  public constructor(
    public todoListId : string = '',
    public title      : string = '',
    public description: string = '',
    public begin      : string = '',
    public end        : string = '',
  ) { }
}
