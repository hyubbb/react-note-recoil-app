import styled from "styled-components";

export const Container = styled.nav<{ $openMenu: boolean }>`
  position: relative;

  @media screen and (max-width: 950px) {
    z-index: 2;
    top: 0;
    left: 0;
    /* height: 100vh; */

    cursor: pointer;
  }
`;

export const MainBox = styled.div<{ $openMenu: boolean }>`
  display: ${({ $openMenu }) => ($openMenu ? "block" : "none")};

  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: #595959;
  color: #fff;

  .menu__name {
    display: block;
  }

  /* &.open {
    width: 250px;
    transition: 350ms transform ease-in-out;
  } */

  @media screen and (max-width: 950px) {
    /* width: 75px;
    .title__menu__name {
      display: none;
    }
    .title__close {
      display: block;
    }
    .menu__name {
      display: none;
    } */
  }

  @media screen and (max-width: 650px) {
    /* position: ${({ $openMenu }) => ($openMenu ? "absolute" : "absolute")};
    display: ${({ $openMenu }) => ($openMenu ? "block" : "none")}; */

    /* .title__close__mobile {
      display: block;
      margin-right: 20px;
      margin-top: 5px;
      font-size: 1.2rem;
    } */

    /* &.open {
      width: 250px;
      transition: 350ms transform ease-in-out;

      .title__menu__name {
        display: block;
      }
      .menu__name {
        display: block;
      }
    } */
  }
`;

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 30px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.3);
  height: 80px;

  img {
    margin-right: 10px;
  }
  span {
    font-size: 1.25rem;
    font-weight: 700;
  }

  @media screen and (max-width: 950px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const ItemsBox = styled.ul`
  display: grid;

  li {
    padding: 10px;
    width: 100%;
    font-size: 20px;
    /* height: 60px; */
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 700;
    cursor: pointer;

    svg {
      margin-right: 20px;
    }

    a {
      color: #fff;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 30px;
      border-radius: 8px;
    }

    .active-item {
      background-color: rgba(255, 255, 255, 0.18);
    }

    .inactive-item {
      transition: 250ms background-color ease-in-out,
        250ms border-left ease-in-out;
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
  }

  .sidebar__edit-item {
    padding-left: 30px;
    transition: 250ms background-color ease-in-out,
      250ms border-left ease-in-out;
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;
