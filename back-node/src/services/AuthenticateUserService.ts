import axios from 'axios';
import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';
/**
 * Receber code de authentication
 * Recuperar o access_token do github
 * Recuper Informações do usuário no github
 * Verificar se usuário existe no DB
 * ---- SIM - Gerar token
 * ---- NAO - Cadastrar e gerar token
 * Retornar token e informações do usuário
 */

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string,
  email: string
}

interface OriginRequest {
  code: string;
  origin: string;
}

class AuthenticateUserService {
  async execute(data: OriginRequest) {
    const params = {
      client_id: data.origin === 'WEB' ? process.env.GITHUB_CLIENT_ID_WEB : process.env.GITHUB_CLIENT_ID_MOBILE,
      client_secret: data.origin === 'WEB' ? process.env.GITHUB_CLIENT_SECRET_WEB : process.env.GITHUB_CLIENT_SECRET_MOBILE,
    };

    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: params.client_id,
        client_secret: params.client_secret,
        code: data.code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    const { login, id, avatar_url, name, email } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    });

    if (!user) {
      let nameAux = name;
      if(name === null) {
        nameAux = email;
      }
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name: nameAux
        }
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };