import { components } from "./DTO";

//Employee
type EmployeeType = components["schemas"]["EmployeeDTO"];
interface EmployeeDTO extends EmployeeType {}

//Holiday Request
type HolidayRequestType = components["schemas"]["HolidayRequestDTO"];
type HolidayType = components["schemas"]["HolidayTypeDTO"];
interface HolidayRequestDTO extends HolidayRequestType {}
interface HolidayTypeDTO extends HolidayType {}

//Service
type ServiceType = components["schemas"]["ServiceDTO"];
interface ServiceDTO extends ServiceType {}

// POST
type PostType = components["schemas"]["PostDTO"];
interface PostDTO extends PostType {}

// ROLE
type Role = components["schemas"]["RoleDTO"];
interface RoleDTO extends Role {}
enum USER_ROLE {
    ADMIN = "ADMIN",
    EMPLOYEE = "EMPLOYEE",
    HUMAN_RESOURCE = "HUMAN_RESOURCE"
}


// EXPORTS TYPE
export { EmployeeDTO, HolidayRequestDTO, HolidayTypeDTO, ServiceDTO, PostDTO, RoleDTO }

// EXPORT ENUM
export { USER_ROLE }