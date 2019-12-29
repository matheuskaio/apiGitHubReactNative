import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    outline:0;
    /* faz com que a margin o padding e outro elemento que passamos seja somado
    com o espaçamento  */
    box-sizing:border-box;

    html, body, #root{
      min-height:100%
    }

    body{
      background:#448C30;
      -webkit-font-smoothing:antialiased !important;
    }
    body, input, button{
      color:#222;
      font-size:14px;
      font-family:Arial, Helvetica, sans-serif
    }
    button{
      cursor: pointer
    }
  }
`;
