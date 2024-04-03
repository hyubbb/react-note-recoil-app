import styled from "styled-components";

export const Container = styled.nav<{ $openMenu: boolean }>`
  position: relative;

  @media screen and (max-width: 950px) {
    z-index: 2;
    top: 0;
    left: 0;
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

  .title__close {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    line-height: 1.5rem;
    cursor: pointer;
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
