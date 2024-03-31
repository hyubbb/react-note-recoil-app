import styled from "styled-components";

export const Box = styled.div`
  min-width: 300px;
  max-width: 700px;
  max-height: 90vh;
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 20px 20px 25px;
  overflow: hidden;
  overflow-y: auto;

  .readNote__close-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .readNote__title {
    font-size: clamp(1.3rem, 3vw, 1.4rem);
    font-weight: 600;
    margin-bottom: 12px;
  }

  .readNote__content {
    font-size: clamp(15px, 1.3vw, 1rem);
    img {
      border-radius: 10px;
    }
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  min-width: 200px;
  min-height: 100px;
  margin: 10px 0;
  font-size: 14px;
  overflow-y: hidden;
  padding: 0;
  ${(props) => (props.color === "#f1f3f5" ? "color: black" : "color: #e9ecef")};

  img {
    width: 100%;
    border-radius: 5px;
  }
`;

export const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;
  margin-top: 20px;
  border-bottom: 1px solid black;
  ${(props) => (props.color === "#f1f3f5" ? "color: black" : "color: white")};
  .noteCard__title {
    font-weight: 600;
    font-size: 1.15rem;
    cursor: pointer;
  }

  .noteCard__top-options {
    white-space: nowrap;
    margin-left: 8px;

    .noteCard__priority {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;
      margin-right: 20px;
    }

    .noteCard__pin {
      svg {
        font-size: 15px;
      }
    }
  }
`;

export const TagsBox = styled.div`
  height: 25px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  span {
    display: inline;
    background-color: rgba(0, 0, 0, 0.07);
    color: rgba(0, 0, 0, 0.7);
    padding: 2px 5px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 500;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .noteCard__date {
    font-size: 12px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
  }
`;
