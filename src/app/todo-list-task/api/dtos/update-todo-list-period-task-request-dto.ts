export class UpdateTodoListPeriodTaskRequestDto {
  public constructor(
    public todoListId    : string = '',
    public todoListTaskId: string = '',
    public title         : string = '',
    public description   : string = '',
    public begin         : number = 0,
    public end           : number = 0,
  ) {}
}
