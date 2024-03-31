import { Container, StyledNav, TagList } from "./Navbar.styles";
import { ButtonFill } from "../../styles/styles";
import { NavLink, useLocation } from "react-router-dom";
import getStandardName from "../../utils/getStandardName";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toggleTagsModalSelector } from "../../recoil/atoms/modalState";
import { tagsListState } from "../../recoil/atoms/tagsListState";
import { CgMenuGridO } from "react-icons/cg";
import { menuMobileState } from "../../recoil/atoms/menuListState";

const Navbar = () => {
  const { pathname, state } = useLocation();
  const setTagsModalState = useSetRecoilState(toggleTagsModalSelector);
  const { tagsList } = useRecoilValue(tagsListState);

  const [isOpen, setIsOpen] = useRecoilState(menuMobileState);

  const isMenu = () => {
    console.log("first", isOpen);
    setIsOpen(!isOpen);
  };

  if (pathname === "/404") return null;

  return (
    <>
      <StyledNav>
        <Container>
          <>
            <div className='title__icon__mobile' onClick={() => isMenu()}>
              <CgMenuGridO />
            </div>
            <div className='nav__page-title'>
              {state ? getStandardName(state) : "Note"}
            </div>
            {state !== "Trash" && state !== "Archive" ? (
              <ButtonFill
                onClick={() =>
                  setTagsModalState({ state: "create", value: true })
                }
                className='nav__btn'
              >
                <span>+</span>
              </ButtonFill>
            ) : (
              <div></div>
            )}
          </>
        </Container>
      </StyledNav>
      {/* {pathname !== "/trash" && (
        <TagList>
          <li key={"all"}>
            <NavLink
              to={`/tag/all`}
              state={"all"}
              className={({ isActive }) =>
                isActive ? "active-item" : "inactive-item"
              }
            >
              #All
            </NavLink>
          </li>
          {tagsList?.map(({ tag, id }) => (
            <li key={id}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
              >
                <span>#{getStandardName(`${tag}`)}</span>
              </NavLink>
            </li>
          ))}
        </TagList>
      )} */}
    </>
  );
};
``;
export default Navbar;
