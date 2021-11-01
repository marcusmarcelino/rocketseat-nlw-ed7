import styled from 'styled-components';
import BackgroundImage from './assets/background.svg';

export const ContentWrapper = styled.main`
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 453px;
  column-gap: 120px;
  position: relative;

  &.contentSigned::before {
    content: '';
    height: 100vh;
    width: 420px;
    background: url(${BackgroundImage}) no-repeat;
    background-size: cover;
    position: fixed;
    right: 0;
    top: 0;
  }
`;

export const Title = styled.h3``;