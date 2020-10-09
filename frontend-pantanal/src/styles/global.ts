import { createGlobalStyle } from 'styled-components'

/**
 * Aqui eu posso criar configurações de css em forma de styled components pra toda a aplicação, de forma global
 */

export default createGlobalStyle `
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body{
    background:#87CEFA;
  }

  input, button, h1, p{
    font-family: Ubuntu Condensed;
  }

`;