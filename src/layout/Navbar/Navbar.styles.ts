import styled from "styled-components";

export const StyledNav = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
  padding: 0 30px;

  .nav__menu {
    display: none;
  }

  @media screen and (max-width: 950px) {
    padding: 0 20px;
    .nav__menu {
      display: none;
      flex-basis: 5%;
      margin: 8px 10px 0px 0px;
      svg {
        font-size: 1.65rem;
        cursor: pointer;
      }
    }
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav__page-title {
    font-weight: 600;
    font-size: 1.3rem;
  }

  .title__icon__mobile {
    display: none;
    font-size: 1.2rem;
    padding-left: 6px;
    color: black;
  }

  @media screen and (max-width: 430px) {
    .title__icon__mobile {
      position: absolute;
      display: block;
      left: 0;
      margin-top: 5px;
      margin-left: 24px;
    }
  }
`;

export const TagList = styled.ul`
  display: flex;
  padding: 20px 10px 0px;
  overflow: hidden;
  text-wrap: nowrap;

  li {
    list-style: none;
    border: 1px solid #424242;
    border-radius: 15px;
    padding: 5px 10px;
    margin: 0 10px;
  }
`;
