import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import * as S from './style';

export function App() {
  return (
    <S.Container className="contentWrapper">
      <MessageList />
      <LoginBox />
    </S.Container>
  );
}
