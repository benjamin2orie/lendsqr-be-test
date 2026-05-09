import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BlacklistService {
  constructor(private readonly httpService: HttpService) {}

  async check(email: string): Promise<boolean> {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.ADJUTOR_API_URL}/karma/blacklist`,
        {
          params: { email },
          headers: { Authorization: `Bearer ${process.env.ADJUTOR_API_KEY}` },
        }
      );

      return response.data.blacklisted;
    } catch (error) {
      // Fail safe: reject onboarding if API fails
      return true;
    }
  }
}
