import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Container, ItemsBox, MainBox, StyledLogo } from "./Sibebar.styles";
import { GoInbox, GoLightBulb, GoTrash } from "react-icons/go";
import { CgMenuGridO } from "react-icons/cg";
import getStandardName from "../../utils/getStandardName";
import { useRecoilState } from "recoil";
import { menuState } from "../../recoil/atoms/menuListState";

const items = [
  { icon: <GoInbox />, title: "Archive", id: 1 },
  { icon: <GoTrash />, title: "Trash", id: 2 },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useRecoilState(menuState);
  // const setTagsModalState = useSetRecoilState(toggleTagsModalSelector);
  useEffect(() => {
    const handleScroll = () => {
      const elm = document.querySelector(".mainBox");
      if (window.innerWidth > 950) {
        elm?.classList.remove("open");
      }
    };
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const Sidebar = () => {
    const elm = document.querySelector(".mainBox");
    elm?.classList.toggle("open");
  };

  if (pathname === "/404") return null;

  return (
    <Container $openMenu={isOpen} className='menu__background'>
      <MainBox $openMenu={isOpen} className='mainBox'>
        <StyledLogo>
          <div className='title__icon' onClick={() => Sidebar()}>
            <CgMenuGridO />
          </div>

          <div className='title__menu__name'>
            <h1>Keep</h1>
          </div>
        </StyledLogo>

        <ItemsBox>
          <li onClick={() => setIsOpen(false)}>
            <NavLink
              to={"/"}
              state={`notes`}
              className={({ isActive }) =>
                isActive ? "active-item" : "inactive-item"
              }
            >
              <span>
                <GoLightBulb />
              </span>
              <span className='menu__name'>{getStandardName("notes")}</span>
            </NavLink>
          </li>

          {/* other Items */}
          {items.map(({ icon, title, id }) => (
            <li key={id} onClick={() => setIsOpen(false)}>
              <NavLink
                to={`/${title.toLocaleLowerCase()}`}
                state={`${title}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
              >
                <span>{icon}</span>
                <span className='menu__name'>{title}</span>
              </NavLink>
            </li>
          ))}

          {/* <li
            className='sidebar__edit-item'
            onClick={() => setTagsModalState({ state: "edit", value: true })}
          >
            <span>
              <GoTag />
            </span>
            <span className='menu__name'>Edit Tags</span>
          </li> */}
        </ItemsBox>
      </MainBox>
    </Container>
  );
};

export default Sidebar;
