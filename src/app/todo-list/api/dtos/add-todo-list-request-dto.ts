export class AddTodoListRequestDto {
  public constructor(
    public title      : string = '',
    public description: string = '',
  ) {}
}
