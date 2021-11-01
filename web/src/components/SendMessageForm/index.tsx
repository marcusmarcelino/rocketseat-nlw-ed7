import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import * as S from './styled';

export function SendMessageForm() {
  const { user, signOut} = useContext(AuthContext);

  const [message, setMessage] = useState('');


  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if(!message.trim()) {
      return;
    }

    await api.post('messages', { message });

    setMessage('');
  }

  return (
    <S.SendMessageFormWrapper>
      <S.SignOutButton onClick={signOut}>
        <VscSignOut size="32"/>
      </S.SignOutButton>

        <S.UserInformation>
          <S.UserImage className="userImage">
            <S.Image src={user?.avatar_url} alt={user?.name} />
          </S.UserImage>

          <S.UserName>{user?.name}</S.UserName>
          <S.UserGithub>
            <VscGithubInverted size="16" />
            {user?.login}
          </S.UserGithub>
        </S.UserInformation>

        <S.SendMessageForm onSubmit={handleSendMessage}>
          <S.Label htmlFor="message">Mensagem</S.Label>
          <S.TextArea 
            name="message" 
            id="message" 
            placeholder="Qual a sua espectativa para o evento?"
            onChange={event => setMessage(event.target.value)}
            value={message}
          >
          </S.TextArea>
          <S.ButtonSubmit type="submit">Enviar mensagem</S.ButtonSubmit> 
        </S.SendMessageForm>
      
    </S.SendMessageFormWrapper>
  );
}