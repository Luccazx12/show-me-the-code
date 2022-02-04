import { Request, Response } from 'express';
import { GetAllTariffsService } from '@modules/Tariffs/services/GetAllTariffsService';

export class TariffController {
  async getAllTariffs(request: Request, response: Response) {
    const service = new GetAllTariffsService();
    const tariffs = await service.execute();
    return response.json(tariffs);
  }
}
