import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Database...');

  // 1. Create Roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'super_admin' },
    update: {},
    create: {
      name: 'super_admin',
      permissions: ['manage_all']
    }
  });

  await prisma.role.upsert({
    where: { name: 'editor' },
    update: {},
    create: {
      name: 'editor',
      permissions: ['manage_posts', 'manage_events']
    }
  });

  // 2. Create Super Admin User
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@shubban.org' },
    update: {
      password: hashedPassword
    },
    create: {
      name: 'Super Admin',
      email: 'admin@shubban.org',
      password: hashedPassword,
      phone: '01700000000',
      roleId: superAdminRole.id,
      status: 'ACTIVE'
    }
  });

  console.log(`✅ Super Admin created: ${adminUser.email}`);
  console.log(`Password is: password123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
