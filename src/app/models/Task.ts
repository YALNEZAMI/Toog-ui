import { User } from './User';

export interface Task {
  id?: string;
  project_id?: string;
  name?: string;
  description?: string;
  deadLine?: any;
  participants?: User[];
  order?: number;
  photo?: string;
}
