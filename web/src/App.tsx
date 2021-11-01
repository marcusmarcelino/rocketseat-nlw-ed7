import { useContext } from 'react';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/auth';
import * as S from './style';

export function App() {

  const { user } = useContext(AuthContext);

  return (
    <S.ContentWrapper className={!!user ? 'contentSigned' : ''}>
      <MessageList />

      { !!user ? <SendMessageForm /> : <LoginBox /> }
    </S.ContentWrapper>
  );
}
