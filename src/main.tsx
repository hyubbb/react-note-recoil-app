import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { Provider } from "react-redux";
// import { store } from "./store/index.ts";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <Provider store={store}>
  // </Provider>

  <RecoilRoot>
    <App />
  </RecoilRoot>
);
