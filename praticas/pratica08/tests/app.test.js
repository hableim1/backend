const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let authToken = null;
let renewedToken = null;

describe('Testes de Integração da API', () => {

    it('GET /produtos deve retornar 401 e "Não autorizado" sem token', async () => {
        const response = await request.get('/produtos');
        expect(response.statusCode).toBe(401);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.msg).toBe('Não autorizado');
    });

    it('GET /produtos deve retornar 401 e "Token inválido" com token aleatório', async () => {
        const response = await request.get('/produtos')
            .set('Authorization', 'Bearer 123456789');
        expect(response.statusCode).toBe(401);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body.msg).toBe('Token inválido');
    });

    it('POST /usuarios/login deve retornar 200, JSON e salvar o token', async () => {
        const response = await request.post('/usuarios/login')
            .send({ 
                usuario: "ludy@iesb.com", 
                senha: "abcd1234" 
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toHaveProperty('token');
        
        authToken = response.body.token;
    });

    it('GET /produtos deve retornar 200 com o token recém-obtido', async () => {
        const response = await request.get('/produtos')
            .set('Authorization', `Bearer ${authToken}`);
            
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    it('POST /usuarios/renovar deve retornar 200, novo JSON e salvar o novo token', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('Authorization', `Bearer ${authToken}`);
            
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toHaveProperty('token');
        
        renewedToken = response.body.token;
    });

    it('GET /produtos deve retornar 200 com o token renovado', async () => {
        const response = await request.get('/produtos')
            .set('Authorization', `Bearer ${renewedToken}`);
            
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });
});
