import { css } from '@emotion/react';
import 'normalize.css';

export default css`
  html, body, #root {
    width: 100%;
    height: 100%;
  }

  ul, ol {
    display: flex;
    flex-direction: column;
  }

  p {
    margin: 0;
  }

  * { 
    box-sizing: border-box;
  }
`;