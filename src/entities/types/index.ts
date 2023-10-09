import { components } from "./DTO";

//EmployeeController
type EmployeeForCreation = components["schemas"]["EmployeeDTOForCreation"];
type EmployeeForLogin = components["schemas"]["EmployeeDTOForLogin"];
type EmployeeForUpdate = components["schemas"]["EmployeeDTOForUpdate"];
type EmployeeType = components["schemas"]["EmployeeDTO"];
type EmployeeToken = components["schemas"]["EmployeeTokenDTO"];

interface EmployeeDTOForCreation extends EmployeeForCreation {}
interface EmployeeTokenDTO extends EmployeeToken {}
interface EmployeeDTO extends EmployeeType {}
interface EmployeeDTOForLogin extends EmployeeForLogin {}
interface EmployeeDTOForUpdate extends EmployeeForUpdate {}

//Holiday Request
type HolidayRequestType = components["schemas"]["HolidayRequestDTO"];

type HolidayTypeDTO = components["schemas"]["HolidayTypeDTO"];

interface HolidayRequestDTO extends HolidayRequestType {}

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

enum HolidayStatusDTO {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

// Setting
type Setting = components["schemas"]["SettingDTO"];
interface SettingDTO extends Setting {}

// EXPORTS TYPE
export { 
  EmployeeDTOForCreation,
  EmployeeTokenDTO,
  EmployeeDTO,
  EmployeeDTOForLogin,
  EmployeeDTOForUpdate,
  HolidayRequestDTO,
  ServiceDTO,
  PostDTO,
  RoleDTO,
  SettingDTO,
  HolidayTypeDTO
};

// EXPORT ENUM
export { USER_ROLE, HolidayStatusDTO };