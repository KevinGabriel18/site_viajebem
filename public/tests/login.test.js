const request = require('supertest');
const app = require('../../app');


//Testes Criado por Kevin Gabriel
// Testes para login Administrador





// Mock do Firebase
jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn((auth, email, senha) => {
      if (email === 'admin@gmail.com' && senha === 'admin1') {
        return Promise.resolve({
          user: { email }
        });
      } else {
        return Promise.reject({ code: 'auth/wrong-password', message: 'Senha incorreta' });
      }
    }),
    createUserWithEmailAndPassword: jest.fn()
  };
});

describe('Rota POST /login', () => {
  // Teste para login bem-sucedido
  it('deve fazer login com admin e redirecionar para /dashboard', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'admin@gmail.com', senha: 'admin1' });

    expect(res.statusCode).toBe(200);
    expect(res.body.redirectTo).toBe('/dashboard');
  });

  // Teste para login falhado

  it('deve falhar com senha errada', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'admin@gmail.com', senha: 'errada' });

    expect(res.statusCode).toBe(401);
    expect(res.text).toContain('Email ou senha incorretos');
  });
});
