import { User } from './User';

export interface Project {
  id?: string;
  name?: string;
  description?: string;
  photo?: string;
  owner?: any;
  participants?: any[];
  deadLine?: any;
}
