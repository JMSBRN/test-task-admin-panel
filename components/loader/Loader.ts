import styled, { keyframes } from 'styled-components';

export interface LoaderProps {
  size: 'small' | 'madium' | 'large';
}

  const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    `;
   const setStyle = (props: LoaderProps) =>  {
    if (props.size === 'small') return '25px';
    if (props.size === 'large') return '60px';
    return '40px';
   };
  const Loader = styled.div<LoaderProps>`
    border: 2px solid white; /* Light grey */
    border-top: 2px solid rgb(54, 38, 167); /* Blue */
    border-radius: 50%;
    width: ${(props) => setStyle(props)};
    height: ${(props) => setStyle(props)};
    animation: ${spin} 2s linear infinite;
  `;

export default Loader;
