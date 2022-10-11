export class TodoListTaskDateDto {
  public constructor(
    public day     : number  = 0,
    public fullDay : boolean = false,
    public start   : number  = 0,
    public end     : number  = 0,
  ) {}
}
