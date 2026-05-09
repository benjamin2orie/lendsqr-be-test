import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { db } from '../../config/knex.config';
 


@Injectable()
export class WalletsService {
  async fundWallet(userId: string, amount: number) {
    return db.transaction(async trx => {
      const wallet = await trx('wallets').where({ user_id: userId }).first();
      if (!wallet) throw new BadRequestException('Wallet not found');

      const newBalance = Number(wallet.balance) + amount;
      await trx('wallets').where({ user_id: userId }).update({ balance: newBalance });
      await trx('transactions').insert({ wallet_id: wallet.id, type: 'fund', amount });

      return newBalance;
    });
  }

  async transferFunds(fromUserId: string, toUserId: string, amount: number) {
    return db.transaction(async trx => {
      const fromWallet = await trx('wallets').where({ user_id: fromUserId }).first();
      const toWallet = await trx('wallets').where({ user_id: toUserId }).first();

      if (!fromWallet || !toWallet) throw new BadRequestException('Wallet not found');
      if (Number(fromWallet.balance) < amount) throw new BadRequestException('Insufficient funds');

      await trx('wallets').where({ id: fromWallet.id }).update({ balance: Number(fromWallet.balance) - amount });
      await trx('wallets').where({ id: toWallet.id }).update({ balance: Number(toWallet.balance) + amount });

      await trx('transactions').insert({ wallet_id: fromWallet.id, type: 'transfer', amount, metadata: JSON.stringify({ toUserId }) });
      await trx('transactions').insert({ wallet_id: toWallet.id, type: 'transfer', amount, metadata: JSON.stringify({ fromUserId }) });

      return { fromBalance: Number(fromWallet.balance) - amount, toBalance: Number(toWallet.balance) + amount };
    });
  }

  async withdrawFunds(userId: string, amount: number) {
    return db.transaction(async trx => {
      const wallet = await trx('wallets').where({ user_id: userId }).first();
      if (!wallet) throw new BadRequestException('Wallet not found');
      if (Number(wallet.balance) < amount) throw new BadRequestException('Insufficient funds');

      const newBalance = Number(wallet.balance) - amount;
      await trx('wallets').where({ user_id: userId }).update({ balance: newBalance });
      await trx('transactions').insert({ wallet_id: wallet.id, type: 'withdraw', amount });

      return newBalance;
    });
  }


    async getWallet(userId: string) {
    const wallet = await db('wallets').where({ user_id: userId }).first();
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }
}
