export class UpdateTodoListPeriodTaskRequestDto {
  public constructor(
    public todoListId    : string = '',
    public todoListTaskId: string = '',
    public title         : string = '',
    public description   : string = '',
    public begin         : string = '',
    public end           : string = '',
  ) {}
}
