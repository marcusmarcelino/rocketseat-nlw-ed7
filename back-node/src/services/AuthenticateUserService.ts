import axios from 'axios';

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
  name: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    return response.data;
  }
}

export { AuthenticateUserService };