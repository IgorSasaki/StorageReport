import { Request, Response } from 'express';
import knex from '../Database/connection';
import md5 from 'md5';

export default class UserController {
    async index(response: Response) {
        const users = await knex('users').select('*');

        return response.json(users);
    }

    async create(request: Request, response: Response) {
        const {
            name, username, document,
            dataNasc, gender, uf, city,
            email, password
        } = request.body;

        const passwordEncrypted = md5(password);
        const documentEncrypted = md5(document);
        const emailEncrypted = md5(email);

        const infoUser = {
            name, username, document: documentEncrypted,
            dataNasc, gender, uf, city,
            email: emailEncrypted, password: passwordEncrypted
        }

        const [id] = await knex('users').insert(infoUser);

        return response.json({ id });
    }

    async session(request: Request, response: Response) {
        const { email, password } = request.body;

        const emailEncrypted = md5(email);

        const user = await knex('users')
            .select('*')
            .where('email', emailEncrypted).first();

        if (!user) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }

        const passwordEncrypted = md5(password);

        if (user.password === passwordEncrypted) {
            return response.status(200).json({
                id: user.id, name: user.name, username: user.username
            });
        }
        else {
            return response.status(400).json({ message: 'Senha Incorreta' });
        }
    }

    async update(request: Request, response: Response) {
        const { password, newPassword } = request.body;
        const idUser = Number(request.headers.authorization);

        const passwordEncrypted = md5(password);
        const newPasswordEncrypted = md5(newPassword);

        const user = await knex('users')
            .select('*')
            .where('id', idUser).first();

        if (user.password === passwordEncrypted) {
            await knex('users')
                .update('password', newPasswordEncrypted)
                .where('id', idUser);

            return response.status(200).json({ message: 'Senha Alterada com Sucesso' });
        }
        else {
            return response.status(400).json({ message: 'Senha Incorreta' });

        }
    }
}