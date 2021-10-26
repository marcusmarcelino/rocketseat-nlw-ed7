import styled from 'styled-components';

import BannerGirl from '../../assets/banner-girl.png'

export const LoginBoxWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: #17171a url(${BannerGirl}) no-repeat center top;

  padding: 440px 80px 0;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.strong`
  font-size: 32px;
  line-height: 36px;
`;

export const Link = styled.a`
  cursor: pointer;

  background: #ffcd1e;
  margin-top: 32px;
  padding: 0 40px;
  height: 56px;
  color: #09090a;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.9);
    transition: 2s ease;
  }

  svg {
    margin-right: 16px;
  }
`;