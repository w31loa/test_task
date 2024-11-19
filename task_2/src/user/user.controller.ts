import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('reset-problems')
  async resetProblems() {
    const count = await this.userService.resetProblemsFlag();
    return { message: `Flag reset for ${count} users.` };
  }
}
