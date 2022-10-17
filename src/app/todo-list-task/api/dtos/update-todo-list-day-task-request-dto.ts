export class UpdateTodoListDayTaskRequestDto {
  public constructor(
    public todoListId    : string = '',
    public todoListTaskId: string = '',
    public title         : string = '',
    public description   : string = '',
    public date          : number = 0,
  ) {}
}
