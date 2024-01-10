import styled from "styled-components";

export const Container = styled.div<{ $noteColor: string }>`
  .ql-editor {
    min-height: 200px;
    max-height: 700px;

    background-color: ${(props) => props.$noteColor};
  }
`;
