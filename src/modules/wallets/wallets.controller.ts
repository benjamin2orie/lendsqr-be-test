import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { FundWalletDto } from './dto/wallet.dto';
import { TransferWalletDto } from './dto/wallet.dto';
import { WithdrawWalletDto } from './dto/wallet.dto';   
import {ApiTags, ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";

@ApiTags('Wallets')
@ApiBearerAuth()
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @ApiOperation({ summary: 'Fund wallet' })
  @ApiResponse({ status: 200, description: 'Wallet funded successfully' })
  @Post('fund')
  async fund(@Body() body: FundWalletDto) {
    const balance = await this.walletsService.fundWallet(body.userId, body.amount);
    return { balance };
  }

  @ApiOperation({ summary: 'Transfer funds between wallets' })
  @ApiResponse({ status: 200, description: 'Transfer successful' })
  @Post('transfer')
  async transfer(@Body() body: TransferWalletDto) {
    const result = await this.walletsService.transferFunds(body.fromUserId, body.toUserId, body.amount);
    return result;
  }

  @ApiOperation({ summary: 'Withdraw funds from wallet' })
  @ApiResponse({ status: 200, description: 'Withdrawal successful' })
  @Post('withdraw')
  async withdraw(@Body() body: WithdrawWalletDto) {
    const balance = await this.walletsService.withdrawFunds(body.userId, body.amount);
    return { balance };
  }

  @ApiOperation({ summary: 'Get wallet balance' })
  @ApiResponse({ status: 200, description: 'Wallet balance retrieved' })
  @Get(':userId')
  async getBalance(@Param('userId') userId: string) {
    const wallet = await this.walletsService.getWallet(userId);
    return wallet;
  }
}
