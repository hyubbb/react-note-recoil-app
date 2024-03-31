import { atom } from "recoil";

// 메뉴 상태를 위한 Atom

export const menuState = atom({
  key: "menuState", // 고유한 키
  default: false, // 초기 상태 (리덕스의 initialState에 해당)
});

export const menuMobileState = atom({
  key: "menuMobileState", // 고유한 키
  default: false, // 초기 상태 (리덕스의 initialState에 해당)
});
