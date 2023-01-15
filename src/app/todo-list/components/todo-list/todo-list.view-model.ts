export interface TodoListProps {
  title      : string;
  description: string;
}

export class TodoListViewModel implements TodoListProps {
  public constructor(
    public todoListId : string = '',
    public title      : string = '',
    public description: string = '',
  ) { }
}
