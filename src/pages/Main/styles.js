import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    /* Para que o icone fique alinhado com o h1 */
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  /* Dessa forma garanto que o input e o botão fique um ao lado do outro */
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    /* Para ocupar todo o espaço possível */
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg)
  }to{
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: "submit",
  disabled: props.loading
}))`
  background: #448c30;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;  
  border-radius: 4px;

  /* PARA CENTRALIZAR O CONTEUDO DO BOTÃO NO CENTRO DELE */
  display: flex;
  justify-content: center;
  align-items: center;
  /* & -> Para se referir ao elemento em si */
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  /* svg { */
    /* SE FIZER ASSIM ELE VAI FICAR RODANDO DIRETO E SÓ QUERO QUANDO O LOADING TIVER TRUE */
    /* animation: ${rotate} 2s linear infinite; */
    /* animation: ${rotate} 2s linear infinite; */
  /* } */


  /* Com o  props.loading && ele verifica se é true, e o && é para se referenciar a ela mesma*/
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}

`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    /* Joga o nome para a esquerda e o detalhe para direita */
    justify-content: space-between;
    align-items: center;
    border-left: 6px solid #448c30;
    /* PEGO TODO LI QUE É SEGUIDO POR OUTRO */

    /* & + li {
      border-top: 1px solid #eee;
    } */

    span {
      margin-left: 30px;
    }
    a {
      color: #448c30;
      text-decoration: none;
    }
  }
`;
