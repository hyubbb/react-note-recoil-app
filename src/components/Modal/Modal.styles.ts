import styled from "styled-components";

export const FixedContainer = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 4;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  padding: 30px;

  &.zIndex {
    z-index: 10;
  }

  &.tagModal {
    z-index: 11;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const DeleteBox = styled.div`
  width: 35px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.5);
    transition: 250ms transform ease-in-out, 200ms color ease-in-out;
    &:hover {
      transform: scale(1.15);
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;
