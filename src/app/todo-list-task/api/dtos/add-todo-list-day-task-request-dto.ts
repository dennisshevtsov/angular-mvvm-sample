export class AddTodoListDayTaskRequestDto {
  public constructor(
    public todoListId : string  = '',
    public title      : string  = '',
    public description: string  = '',
    public completed  : boolean = false,
    public date       : number  = Date.now(),
  ) { }
}
