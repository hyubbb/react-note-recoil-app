import React from "react";
import { Container, StyledNav } from "./Navbar.styles";
import { ButtonFill } from "../../styles/styles";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { toggleMenu } from "../../store/menu/menuSlice";
import { toggleCreateNoteModal } from "../../store/modal/modalSlice";
import getStandardName from "../../utils/getStandardName";

const Navbar = () => {
  const { pathname, state } = useLocation();
  const dispatch = useAppDispatch();

  if (pathname === "/404") return null;

  return (
    <StyledNav>
      <div className='nav__menu'>
        <FiMenu onClick={() => dispatch(toggleMenu(true))}></FiMenu>
      </div>
      <Container>
        <div className='nav__page-title'>{getStandardName(state)}</div>
        {state !== "Trash" && state !== "Archive" && (
          <ButtonFill
            onClick={() => dispatch(toggleCreateNoteModal(true))}
            className='nav__btn'
          >
            <span>+</span>
          </ButtonFill>
        )}
      </Container>
    </StyledNav>
  );
};

export default Navbar;
