import { Controller, Get, Query } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('flag')
  getFlag(@Query('secret') secret: string) {
    if (secret === 'XSTWLC4I') {
      const flag = fs.readFileSync(join(process.cwd(), 'flag.txt'), 'utf-8');
      return { flag };
    }

    return null;
  }
}
