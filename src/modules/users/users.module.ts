import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BlacklistModule } from '../blacklisted/blacklisted.module';

@Module({
  imports: [BlacklistModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
