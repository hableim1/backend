const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

let usuarioId = null;
let token = null;

describe("Testes do recurso /usuarios", () => {

  test("POST /usuarios deve criar usuário", async () => {
    const res = await request
      .post("/usuarios")
      .send({ email: "usuario@email.com", senha: "abcd1234" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe("usuario@email.com");

    usuarioId = res.body._id;
  });

  test("POST /usuarios sem JSON deve retornar 422", async () => {
    const res = await request.post("/usuarios");

    expect(res.status).toBe(422);
    expect(res.body.msg).toBe("Email e Senha são obrigatórios");
  });

  test("POST /usuarios/login deve retornar token", async () => {
    const res = await request
      .post("/usuarios/login")
      .send({ usuario: "usuario@email.com", senha: "abcd1234" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });

  test("POST /usuarios/login sem JSON retorna 401", async () => {
    const res = await request.post("/usuarios/login");

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Credenciais inválidas");
  });

  test("POST /usuarios/renovar com token válido", async () => {
    const res = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /usuarios/renovar com token inválido", async () => {
    const res = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789");

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Token inválido");
  });

  test("DELETE /usuarios/:id deve excluir o usuário", async () => {
    const res = await request
      .delete(`/usuarios/${usuarioId}`)
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

});
