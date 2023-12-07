import { Container, StyledNav } from "./Navbar.styles";
import { ButtonFill } from "../../styles/styles";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
// import { useAppDispatch } from "../../hooks/redux";

// import { toggleCreateNoteModal } from "../../store/modal/modalSlice";
import getStandardName from "../../utils/getStandardName";
import { useSetRecoilState } from "recoil";
import { menuState } from "../../recoil/atoms/menuListState";
import { toggleTagsModalSelector } from "../../recoil/atoms/modalState";

const Navbar = () => {
  const { pathname, state } = useLocation();
  const toggleMenu = useSetRecoilState(menuState);
  const setTagsModalState = useSetRecoilState(toggleTagsModalSelector);

  if (pathname === "/404") return null;

  return (
    <StyledNav>
      <div className='nav__menu'>
        <FiMenu onClick={() => toggleMenu(true)} />
      </div>
      <Container>
        <div className='nav__page-title'>
          {state ? getStandardName(state) : "Note"}
        </div>
        {state !== "Trash" && state !== "Archive" && (
          <ButtonFill
            onClick={() => setTagsModalState({ state: "create", value: true })}
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
