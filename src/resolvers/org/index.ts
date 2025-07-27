import DepartmentPermissions from './department-permissions';
import DepartmentTransportModes from './department-transport-modes';
import DepartmentUserPermissions from './department-user-permissions';
import DepartmentUsers from './department-users';
import Departments from './departments';
import Drivers from './drivers';
import Vehicles from './vehicles';

export const queries = {
  departments: Departments.queries,
  departmentPermissions: DepartmentPermissions.queries,
  departmentTransportModes: DepartmentTransportModes.queries,
  departmentUserPermissions: DepartmentUserPermissions.queries,
  departmentUsers: DepartmentUsers.queries,
  drivers: Drivers.queries,
  vehicles: Vehicles.queries,
};

export const mutations = {
  ...Departments.mutations,
  ...DepartmentPermissions.mutations,
  ...DepartmentTransportModes.mutations,
  ...DepartmentUserPermissions.mutations,
  ...DepartmentUsers.mutations,
  ...Drivers.mutations,
  ...Vehicles.mutations,
};

export default {
  queries,
  mutations,
};
