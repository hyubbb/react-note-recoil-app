import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Container, ItemsBox, MainBox, StyledLogo } from "./Sidebar.styles";
import { FaArchive, FaLightbulb, FaTag, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import getStandardName from "../../utils/getStandardName";
import { v4 } from "uuid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { menuState } from "../../recoil/atoms/menuListState";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { tagsListState } from "../../recoil/atoms/tagsListState";
import { toggleTagsModalSelector } from "../../recoil/atoms/modalState";

const items = [
  { icon: <FaArchive />, title: "Archive", id: v4() },
  { icon: <FaTrash />, title: "Trash", id: v4() },
];

const Sidebar = () => {
  // const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { tagsList } = useRecoilValue(tagsListState);
  const [isOpen, setIsOpen] = useRecoilState(menuState);
  const setTagsModalState = useSetRecoilState(toggleTagsModalSelector);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside({ ref, handler: () => setIsOpen(false) });

  if (pathname === "/404") return null;

  return (
    <Container $openMenu={isOpen ? "open" : ""} className='menu__background'>
      <MainBox $openMenu={isOpen ? "open" : ""} ref={ref}>
        <StyledLogo>
          <h1>Keep</h1>
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
                <FaLightbulb />
              </span>
              <span>{getStandardName("notes")}</span>
            </NavLink>
          </li>
          {tagsList?.map(({ tag, id }) => (
            <li key={id} onClick={() => setIsOpen(false)}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
              >
                <span>
                  <FaTag />
                </span>
                <span>{getStandardName(`${tag}`)}</span>
              </NavLink>
            </li>
          ))}
          {/* edit tag item */}
          <li
            className='sidebar__edit-item'
            onClick={() => setTagsModalState({ state: "edit", value: true })}
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit Notes</span>
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
                <span>{title}</span>
              </NavLink>
            </li>
          ))}
        </ItemsBox>
      </MainBox>
    </Container>
  );
};

export default Sidebar;
