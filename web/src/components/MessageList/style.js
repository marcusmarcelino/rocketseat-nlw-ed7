import styled from 'styled-components';

export const MessageListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: flex-start;

  > svg {
    height: 28px;
    margin: 32px 0;
  }
`;

export const MessageList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  flex: 1;
`;

export const Message = styled.li`
  max-width: 440px;

  &:nth-child(2) {
    margin-left: 80px;
  }
`;

export const MessageContent = styled.p``;

export const MessageUser = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

export const UserName = styled.span`
  font-size: 16px;
  margin-left: 12px;
`;

export const UserImage = styled.div.attrs(props => ({
  image: props.image
}))`
  content: '';
  clear: both;
  display: block;
  visibility: visible;

  height: 160px;
  width: 180px;

  background: url(${(props) => props.image}) no-repeat center top;
  background-size: contain;
`;

export const ContainerImage = styled.div`
  padding: 2px;
  background: linear-gradient(100deg, #ff008e 0%, #ffcd1e 100%);
  border-radius: 50%;
  line-height: 0;
`;

export const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 4px solid #121214;
`;