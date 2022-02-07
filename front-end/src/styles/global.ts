import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}

body{
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font: 400 15px Roboto, sans-serif;
}

.plan-cards {
  display: flex;
  align-items: center;
  justify-content: center;
}

a > span, p > span, h3 > span {
  color: red;
}

.error {
    position: relative;
    animation: shake .1s linear;
    animation-iteration-count: 3;
}

@keyframes shake {
    0% { left: -5px; }
    100% { right: -5px; }
}
`;
