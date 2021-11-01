import 'dotenv/config';
import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';

import * as S from './style';

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext);
  return (
    <S.LoginBoxWrapper>
      <S.Title>Entre e compartilhe sua mensagem</S.Title>
      <S.Link href={signInUrl}>
        <VscGithubInverted size="24" />
        Entrar com Gihtub
      </S.Link>
    </S.LoginBoxWrapper>
  );
}