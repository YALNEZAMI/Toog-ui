import { User } from './User';

export interface Task {
  id?: string;
  projectId?: string;
  name?: string;
  description?: string;
  deadLine?: any;
  participants?: User[];
  order?: number;
  photo?: string;
}
