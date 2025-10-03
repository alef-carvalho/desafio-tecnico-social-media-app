import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('Profile Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    await prisma.$connect();

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Profile Test User',
        email: 'profiletest@example.com',
        password: 'password123'
      });

    token = response.body.token;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /api/profile', () => {
    it('deve retornar perfil do usuário autenticado', async () => {
      const response = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('bio');
      expect(response.body).toHaveProperty('posts');
    });

    it('não deve retornar perfil sem autenticação', async () => {
      const response = await request(app).get('/api/profile');

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /api/profile', () => {
    it('deve atualizar nome do perfil', async () => {
      const response = await request(app)
        .put('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Nome Atualizado'
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Nome Atualizado');
    });

    it('deve atualizar bio do perfil', async () => {
      const response = await request(app)
        .put('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          bio: 'Esta é minha nova bio'
        });

      expect(response.status).toBe(200);
      expect(response.body.bio).toBe('Esta é minha nova bio');
    });

    it('deve atualizar nome e bio juntos', async () => {
      const response = await request(app)
        .put('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Nome e Bio',
          bio: 'Nova bio completa'
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Nome e Bio');
      expect(response.body.bio).toBe('Nova bio completa');
    });

    it('não deve atualizar perfil sem autenticação', async () => {
      const response = await request(app)
        .put('/api/profile')
        .send({
          name: 'Teste'
        });

      expect(response.status).toBe(401);
    });

    it('deve validar tamanho máximo da bio', async () => {
      const longBio = 'a'.repeat(201);

      const response = await request(app)
        .put('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          bio: longBio
        });

      expect(response.status).toBe(400);
    });
  });
});
