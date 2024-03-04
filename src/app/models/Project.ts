import { User } from './User';

export interface Project {
  id?: string;
  name: string;
  description?: string;
  photo?: string;
  owner?: User;
  participants?: any[];
  deadLine?: any;
}
