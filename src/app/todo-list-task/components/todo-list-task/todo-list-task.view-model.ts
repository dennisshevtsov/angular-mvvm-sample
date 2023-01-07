import { TodoListTaskPeriodViewModel, } from '../todo-list-task-period/todo-list-task-period.view-model';

export interface TodoListTaskProps {
  title      : string;
  description: string;
  period     : TodoListTaskPeriodViewModel;
}

export class TodoListTaskViewModel implements TodoListTaskProps {
  public constructor(
    public todoListId    : string = '',
    public todoListTaskId: string = '',
    public title         : string = '',
    public description   : string = '',
    public period        : TodoListTaskPeriodViewModel = new TodoListTaskPeriodViewModel(),
  ) {}
}
