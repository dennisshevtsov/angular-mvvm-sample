export class AddTodoListPeriodTaskRequestDto {
  public constructor(
    public todoListId : string  = '',
    public title      : string  = '',
    public description: string  = '',
    public completed  : boolean = false,
    public begin      : number  = Date.now(),
    public end        : number  = Date.now(),
  ) { }
}
