import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { WalletsService } from './wallets.service';

describe('WalletsService', () => {
  let service: WalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletsService],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
  });

  it('should throw error if insufficient funds', async () => {
    await expect(service.withdrawFunds(1, 100000)).rejects.toThrow('Insufficient funds');
  });
});
