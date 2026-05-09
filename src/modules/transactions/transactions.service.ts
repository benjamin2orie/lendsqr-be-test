import { Injectable } from '@nestjs/common';
import { db } from '../../config/knex.config';

@Injectable()
export class TransactionsService {
  async recordTransaction(walletId: number, type: 'fund' | 'transfer' | 'withdraw', amount: number, metadata?: any) {
    return db('transactions').insert({
      wallet_id: walletId,
      type,
      amount,
      metadata: metadata ? JSON.stringify(metadata) : null,
    });
  }

  async getTransactions(walletId: number) {
    return db('transactions').where({ wallet_id: walletId }).orderBy('created_at', 'desc');
  }
}
