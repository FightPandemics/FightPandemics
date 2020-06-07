import styled from "styled-components";

export const FaqContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QuestionsContainer = styled.div`
  max-width: 70rem;
`;

export const AnswerContainer = styled.div`
  summary::-webkit-details-marker {
    display: none;
  }
  summary {
  font-size: 1.17em;
  margin-left: 7px;
 
  margin-bottom: 0.5em;
  font-family: "Poppins","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  cursor: pointer;
  }
  p {
    margin-left: 15px;
  }
`;
