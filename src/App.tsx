import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AllNotes,
  ArchiveNotes,
  ErrorPage,
  TagNotes,
  TrashNotes,
} from "./pages";
import { Navbar, Sidebar } from "./layout";
import { CreateNoteModal, TagsModal } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilEnv } from "recoil";
import { useRecoilValue } from "recoil";
import { toggleTagsModalState } from "./recoil/atoms/modalState";
import useLoadInitData from "./server/hooks/useLoadInitData";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
function App() {
  useLoadInitData();

  const { viewEditTagsModal, viewCreateNoteModal } =
    useRecoilValue(toggleTagsModalState);
  return (
    <>
      <div className='app'>
        {viewCreateNoteModal && <CreateNoteModal />}
        {viewEditTagsModal && <TagsModal type='edit' />}
        <ToastContainer
          position='bottom-right'
          theme='light'
          pauseOnHover
          autoClose={1500}
        />

        <BrowserRouter>
          <Sidebar />
          <div className='app__container'>
            <Navbar />
            <Routes>
              <Route path='/' element={<AllNotes />} />
              <Route path='/archive' element={<ArchiveNotes />} />
              <Route path='/trash' element={<TrashNotes />} />
              <Route path='/tag/:name' element={<TagNotes />} />
              <Route path='/404' element={<ErrorPage />} />
              <Route path='/*' element={<Navigate to={"/404"} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
