import styled from 'styled-components';

/*
  criar o css em forma de styled components ajuda a reutilizar o css 
  posteriormente caso necessário, já que essa parte do css vai estar 
  em forma de componente
*/

export const Title = styled.h1 `
  font-size: 58px;
  font-family: Ubuntu Condensed;
  color: #228B22	;
`;

export const Centered = styled.div `
  display:flex;
  align-items:center;
  margin-top:15px;
  margin-left:75px;
`;

export const Logo = styled.div `
  font-size: 43px;
  line-height: 45px;
  font-family: Ubuntu Condensed;
  margin-top:55px;
  margin-left:75px;
  display:flex;
`;

export const SubLogo = styled.div `
  font-size: 25px;  
  line-height: 37px;
  font-family: Ubuntu Condensed;
  margin-top:30px;
  margin-left:75px;
`;

export const Links = styled.div`
    width: 335px;
    text-decoration:none;
    height: 72px;
    background:#008000 ;
    border-radius: 7px;
    display: flex;
    align-items: center;
    margin-top: 54px;
    margin-left: 75px;
`

export const Span = styled.div`
    background: rgba(0, 0, 0, 0.08);
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Strong = styled.div`
    flex: 1;
    text-align: center;
    color: #FFF;
    font-family: Roboto;
    font-size: 18px;
`
export const ImagePantanal = styled.div `
    justify-self:flex-end;
    margin-left:85px;
`;

export const Space = styled.div `
  display: flex;
  align-items:flex-start;
`;
