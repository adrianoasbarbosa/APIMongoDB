const Usuario = require('../models/userModel');
const bcrypt = require('bcrypt');

async function getUsers(request, response) {
    try {
        const usuarios = await Usuario.find();
        return response.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Failed to fetch users' });
    }
}

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!email) return res.status(400).json({ msg: 'O email é obrigatório' });
        if (!password) return res.status(400).json({ msg: 'A senha é obrigatória' });

        let user = await Usuario.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Email já está em uso' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new Usuario({ name, email, password: hashedPassword });
        await user.save();

        res.status(200).json({ msg: 'Usuário criado com sucesso', user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function loginUser(request, response) {
    try {
        const { email, password } = request.body;

        if (!email) return response.status(400).json({ msg: 'O email é obrigatório' });
        if (!password) return response.status(400).json({ msg: 'A senha é obrigatória' });

        const user = await Usuario.findOne({ email });
        if (!user) return response.status(404).json({ msg: "Usuário não encontrado" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return response.status(422).json({ msg: 'Senha inválida!' });
        }

        return response.status(200).json({ msg: 'Autenticação realizada com sucesso!', user });

    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}

async function deleteUser(request, response) {
    const id = request.params.id;

    try {
        const deletedUser = await Usuario.findByIdAndDelete(id);
        if (!deletedUser) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({ message: 'User deleted', user: deletedUser });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Failed to delete user' });
    }
}

module.exports = {
    getUsers,
    createUser,
    loginUser,
    deleteUser
};
