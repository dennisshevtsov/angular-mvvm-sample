export class AddTodoListDayTaskRequestDto {
  public constructor(
    public todoListId : string = '',
    public title      : string = '',
    public description: string = '',
    public date       : number = 0,
  ) { }
}
