import { VscGithubInverted } from 'react-icons/vsc';

import * as S from './style';

export function LoginBox() {
  return (
    <S.LoginBoxWrapper>
      <S.Title>Entre e compartilhe sua mensagem</S.Title>
      <S.Link href="#">
        <VscGithubInverted size="24" />
        Entrar com Gihtub
      </S.Link>
    </S.LoginBoxWrapper>
  );
}