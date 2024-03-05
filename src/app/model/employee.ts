import { Department } from './department';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  department: Department;
  version: number;
}
