
import { IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FundWalletDto {
  @IsString()
  @ApiProperty({ description: 'The ID of the user funding the wallet' })
  userId: string;

  @IsPositive()
  @ApiProperty({ description: 'The amount to fund the wallet' })
  amount: number;
}

export class TransferWalletDto {
  @IsString()
  @ApiProperty({ description: 'The ID of the user transferring from' })
  fromUserId: string;

  @IsString()
  @ApiProperty({ description: 'The ID of the user transferring to' })
  toUserId: string;

  @IsPositive()
  @ApiProperty({ description: 'The amount to transfer' })
  amount: number;
}

export class WithdrawWalletDto {
  @IsString()
  @ApiProperty({ description: 'The ID of the user withdrawing from' })
  userId: string;

  @IsPositive()
  @ApiProperty({ description: 'The amount to withdraw' })
  amount: number;
}
