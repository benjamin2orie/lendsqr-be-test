// import { Module } from '@nestjs/common';
// import { TransactionsService } from './transactions.service';

// @Module({
//   providers: [TransactionsService]
// })
// export class TransactionsModule {}





import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Module({
  providers: [TransactionsService],
  exports: [TransactionsService], // so WalletsService can use it
})
export class TransactionsModule {}

