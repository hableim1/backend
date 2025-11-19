const usuariosModel = require('../models/usuariosModel');
const { gerarToken, compararSenha, hashSenha } = require('../middlewares/authMiddleware');


async function criar(req, res) {
  try {
    const { usuario, senha } = req.body;

    const emailExiste = await usuariosModel.findOne({ email: usuario });
    if (emailExiste) {
      return res.status(409).json({ msg: 'Usuário já existe' });
    }

    const senhaHash = await hashSenha(senha);

    const novoUsuario = await usuariosModel.create({
      email: usuario,
      senha: senhaHash
    });

    return res.status(201).json(novoUsuario);

  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao criar usuário', erro: error.message });
  }
}


async function entrar(req, res) {
  try {
    const usuarioEncontrado = await usuariosModel.findOne({ email: req.body.usuario });

    if (!usuarioEncontrado) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const senhaConfere = await compararSenha(req.body.senha, usuarioEncontrado.senha);

    if (!senhaConfere) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const token = gerarToken({ email: req.body.usuario });

    return res.status(200).json({ token });

  } catch (error) {
    return res.status(500).json({ msg: 'Erro no servidor', erro: error.message });
  }
}


async function renovar(req, res) {
  try {
    const token = gerarToken({ email: req.usuario });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao renovar token', erro: error.message });
  }
}


async function remover(req, res) {
  try {
    await usuariosModel.findOneAndDelete({ email: req.body.usuario });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao remover usuário', erro: error.message });
  }
}


async function apagar(req, res) {
  try {
    await usuariosModel.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao apagar usuário', erro: error.message });
  }
}


module.exports = {
  criar,
  entrar,
  renovar,
  remover,
  apagar
};
