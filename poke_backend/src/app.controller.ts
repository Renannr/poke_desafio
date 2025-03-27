import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello(@Res() response: Response): Response {
    return response.status(200).json({ msg: 'Hello World' })
  }
}
