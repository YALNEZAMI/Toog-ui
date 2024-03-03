import { User } from './User';

export interface Team {
  id?: string;
  name?: string;
  members?: User[];
  photo?: string;
}
