import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('Post Endpoints', () => {
  let token: string;
  let userId: string;
  let postId: string;

  beforeAll(async () => {
    await prisma.$connect();
    
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Post Test User',
        email: 'posttest@example.com',
        password: 'password123'
      });

    token = response.body.token;
    userId = response.body.user.id;
  });

  afterAll(async () => {
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /api/posts', () => {
    it('deve listar todas as postagens', async () => {
      const response = await request(app).get('/api/posts');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/posts', () => {
    it('deve criar uma nova postagem', async () => {
      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Esta é uma postagem de teste'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.content).toBe('Esta é uma postagem de teste');
      expect(response.body.authorId).toBe(userId);
      
      postId = response.body.id;
    });

    it('não deve criar postagem sem autenticação', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({
          content: 'Postagem sem auth'
        });

      expect(response.status).toBe(401);
    });

    it('deve validar conteúdo obrigatório', async () => {
      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('deve atualizar própria postagem', async () => {
      const response = await request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Postagem atualizada'
        });

      expect(response.status).toBe(200);
      expect(response.body.content).toBe('Postagem atualizada');
    });

    it('não deve atualizar postagem de outro usuário', async () => {
      const otherUserResponse = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Other User',
          email: 'other@example.com',
          password: 'password123'
        });

      const otherToken = otherUserResponse.body.token;

      const response = await request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .send({
          content: 'Tentativa de edição'
        });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('deve deletar própria postagem', async () => {
      const response = await request(app)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it('não deve deletar postagem inexistente', async () => {
      const response = await request(app)
        .delete('/api/posts/invalid-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});
