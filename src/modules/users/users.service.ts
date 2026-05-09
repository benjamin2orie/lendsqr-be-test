

import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { db } from '../../config/knex.config';
import { BlacklistService } from '../blacklisted/blacklisted.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly blacklistService: BlacklistService) {}

  async createUser(name: string, email: string) {
    // const isBlacklisted = await this.blacklistService.check(email);
    // if (isBlacklisted) {
    //   throw new ForbiddenException('User is blacklisted');
    // }

    try {
      return await db.transaction(async trx => {
        const userId = randomUUID();
        const fauxToken = `token-${Date.now()}`;
        await trx('users').insert({
          id: userId,
          name,
          email,
          faux_token: fauxToken
        });

        await trx('wallets').insert({ id: randomUUID(), user_id: userId, balance: 0 });
        return { 
          userId,
          fauxToken
         };
      });
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }
}

