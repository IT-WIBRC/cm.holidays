# cm.holidays
Allow person in the company to ask for a holiday that the company allow. Furthermore, to the responsible to validate this or refuse.

# Limitations for now (0.0.1) but will be manage to the next version
 - Cannot create role
 - Cannot assign role to user
 - cannot update role
 - cannot activate or deactivate role
 - The Roles presents are statics
 - Edit user profile

# TODO
 - Get all information ('role', holiday request, services, posts, employees) according to the user role
 - Edit (EmployeeController, Holiday, Service, Post) information
 - user `express-jwt-permission` to manage permission as well as role (already installed)
 - Cannot activate a post without activating the service before