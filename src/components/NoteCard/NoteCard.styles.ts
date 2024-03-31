import styled from "styled-components";

export const Card = styled.div`
  border-radius: 16px;
  box-shadow: 0px 1.5px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  background-color: white;
  transition: 250ms box-shadow ease-in-out, 300ms transform ease-out;

  position: relative;
  cursor: pointer;
  ${(props) => (props.color === "#f1f3f5" ? "color: black" : "color: white")};
  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.6);

    .relevantBtn {
      display: block;
    }
  }
`;

export const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;
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

export const ContentBox = styled.div`
  width: 100%;
  height: 80px;
  margin: 10px 0;
  padding: 0;
  font-size: 14px;
  overflow-y: hidden;
  position: relative;
  display: block;
  ${(props) => (props.color === "#f1f3f5" ? "color: black" : "color: white")};
  img {
    width: auto;
    height: 50px;
    border-radius: 5px;
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
  display: block;
  position: absolute;
  bottom: 10px;
  width: 100%;
  .noteCard__date {
    font-size: 12px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
  }
  .relevantBtn {
    position: absolute;
    right: 30px;
    bottom: 0;
    display: none;
  }
`;
