import 'dotenv/config';
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode; // Qualquer coisa aceitavel pelo react
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}` // &redirect_uri=http://localhost:3000


  async function signIn(githubCode: string) {
    const dataOrigin = { code: githubCode, origin: 'WEB' };
    const response = await api.post<AuthResponse>('authenticate', { data: dataOrigin });

    if (response.data && response.data.token !== undefined) {
      const { token, user } = response.data;
      localStorage.setItem('@dowhile:token', token);
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      setUser(user);
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>('profile')
        .then(response => {
          setUser(response.data);
        });
    }
  }, [])

  useEffect(() => {
    const url = window.location.href;
    const hashGithubCode = url.includes('?code=');

    if (hashGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      // console.log({ urlWithoutCode, githubCode });

      window.history.pushState({}, '', urlWithoutCode); // limpo a url para que o usuário não veja
      signIn(githubCode);                               // o codigo que foi retornado pelo github
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}