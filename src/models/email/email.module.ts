import { Module } from '@nestjs/common';
import { GenerateCode } from './../../common/utils/generateCode';
import { EmailService } from './email.service';

@Module({
  imports: [],
  providers: [EmailService, GenerateCode],
  controllers: [],
  exports: [EmailService, GenerateCode],
})
export class EmailModule {}
