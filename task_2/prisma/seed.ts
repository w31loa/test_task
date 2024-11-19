import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 1_000_000 }).map((_, i) => ({
    first_name: `FirstName${i}`,
    last_name: `LastName${i}`,
    age: Math.floor(Math.random() * 60) + 18,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    problems: Math.random() > 0.7,
  }));

  console.log('Seeding database...');
  await prisma.user.createMany({ data: users });
  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
