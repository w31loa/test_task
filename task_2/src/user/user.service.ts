import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async resetProblemsFlag(): Promise<number> {
    let totalCount = 0;

    const minId = await this.prisma.user.findFirst({
      orderBy: { id: 'asc' },
      select: { id: true },
    });
    const maxId = await this.prisma.user.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true },
    });

    if (!minId || !maxId) return 0;

    const ranges = [];
    for (let start = minId.id; start <= maxId.id; start += 100_000) {
      const end = Math.min(start + 100_000 - 1, maxId.id);
      ranges.push({ start, end });
    }

    const promises = ranges.map(async (range) => {
      const countInBatch = await this.prisma.user.count({
        where: { problems: true, id: { gte: range.start, lte: range.end } },
      });

      await this.prisma.user.updateMany({
        where: { problems: true, id: { gte: range.start, lte: range.end } },
        data: { problems: false },
      });

      return countInBatch;
    });

    const results = await Promise.all(promises);
    totalCount = results.reduce((sum, count) => sum + count, 0);

    return totalCount;
  }
}
