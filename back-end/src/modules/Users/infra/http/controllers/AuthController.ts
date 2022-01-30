import { Request, Response } from 'express';
import { SigninService } from '@modules/Users/services/AuthService';

export class AuthController {
  async sign(request: Request, response: Response) {
    const { email, password } = request.body;
    const service = new SigninService();
    const result = await service.execute(email, password);
    return response.status(200).json(result);
  }
}
