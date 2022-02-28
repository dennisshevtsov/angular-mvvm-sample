export class TodoListTaskDateDto {
  public constructor(
    public day     : number  = Date.now(),
    public fullDay : boolean = false,
    public start   : number  = Date.now(),
    public end     : number  = Date.now(),
  ) {}
}
