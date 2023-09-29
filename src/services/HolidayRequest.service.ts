import { AppDataSource } from "../data-source";
import { HolidayRequest } from "../entities/HolidayRequest";
import { HolidayStatusDTO } from "../entities/types";
import { Not } from "typeorm";

export class HolidayRequestService {
  private static holidayRequestRepository
    = AppDataSource.getRepository(HolidayRequest);

  static async findByUserId(userId: string): Promise<HolidayRequest[]> {
    return this.holidayRequestRepository.find({
      where: {
        employee: {
          id: userId
        }
      }
    });
  }

  static async findForAdminUser(): Promise<HolidayRequest[]> {
    return this.holidayRequestRepository.find({
      where: {
        status: Not(HolidayStatusDTO.DRAFT)
      }
    });
  }
}