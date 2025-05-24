const USER_ROLES = {
  ADMIN: 'admin',
};
const MODULES = {
  USERS: 'users',
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
};
const ACTIONS = {
  WRITE: 'write',
  READ: 'read',
  DELETE: 'delete',
};
const PERMISSIONS_ARRAY = Object.values(ACTIONS).flatMap((permission) =>
  Object.values(MODULES).map((module) => `${permission}:${module}`)
);

const USER_ROLES_ARRAY = Object.values(USER_ROLES);

function generatePermissions(modules, actions) {
  const perms = {};
  Object.values(actions).forEach((action) => {
    Object.values(modules).forEach((module) => {
      const key = `${action.toUpperCase()}_${module.toUpperCase()}`;
      perms[key] = `${action}:${module}`;
    });
  });
  return perms;
}

module.exports = {
  USER_ROLES,
  USER_ROLES_ARRAY,
  PERMISSIONS_ARRAY,
  MODULES,
  ACTIONS,
  PERMISSIONS: generatePermissions(MODULES, ACTIONS),
};
