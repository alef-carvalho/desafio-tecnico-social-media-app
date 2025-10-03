import { PrismaClient } from '@prisma/client';
import {hash} from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('🗑️  Dados antigos removidos');

  await prisma.user.upsert({
    where: { email: 'csilva.alef@gmail.com' },
    update: {},
    create: {
      name: 'Alef Silva',
      email: 'csilva.alef@gmail.com',
      password: await hash('abc12345', 10),
      bio: 'Engenheiro de Software Sênior',
      posts: {
        createMany: {
          data: [{
            content: 'Olá! Essa é minha primeira postagem 🚀',
          }],
          skipDuplicates: true
        }
      }
    }
  });

  console.log('🌱 Seed finalizado!')

}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
