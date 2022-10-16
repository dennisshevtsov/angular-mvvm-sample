export class AddTodoListPeriodTaskRequestDto {
  public constructor(
    public todoListId : string = '',
    public title      : string = '',
    public description: string = '',
    public begin      : number = 0,
    public end        : number = 0,
  ) { }
}
