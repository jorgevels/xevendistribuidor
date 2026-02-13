import styled from "styled-components";
import { above, colors } from "../../GlobalStyle";

const Container = styled.div`
  width: 100%;
  min-height: 60vh;
`;

const Box = styled.div`
  width: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${above.mediumL`
    flex-direction: row;
  `};
`;

const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 38px;
  margin-top: 1px;
  padding: 4px 14px;
  border: 2px solid #ccc;
  border-radius: 4px;
  border-color: #e32f50;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.buttonHover || "#E64A78"};
    box-shadow: 0 0 5px rgba(163, 213, 106, 0.5);
  }

  &:focus {
    border-color: ${({ theme }) => theme.buttonHover || "#E64A78"};
    box-shadow: 0 0 5px rgba(163, 213, 106, 0.5);
    outline: none;
  }

  ${above.mediumL`
    width: 100%;
  `};

  ${above.medium`
    width: 50vw;
  `};
`;

const List = styled.ul`
  /* margin-top: 140px; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding-bottom: 30px;

  li {
    width: 420px;
    height: 100px;
    margin: 5px 4px;
    background: #f6f8f9;
    border-radius: 4px;
    color: black;
    text-decoration: none;

    .link {
      text-decoration: none;
    }
  }
`;

const Box_texto = styled.div`
  /* width: 70%; */
  height: 280px;
  /* padding: 10px 23px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: -8rem;
  ${above.mediumL`
    flex-direction: row;
  `};
`;

const Texto = styled.h4`
  color: #1b1b25;
  width: 70vw;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background: #e7f4d8;
  margin: 5px;
  font-weight: normal;
`;
export { Container, Box, Input, List, Box_texto, Texto };
