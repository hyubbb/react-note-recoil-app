import { Tag } from "./tag";

export interface Note {
  title: string;
  content: string;
  tags: Tag[];
  color: string;
  priority: string;
  isPinned: boolean;
  isRead: boolean;
  date: string;
  createdTime: number;
  editedTime: null | number;
  id: string;
  type: string;
}

export const singleNote: Note = {
  title: "",
  content: "",
  tags: [{ tag: "", id: "" }],
  color: "",
  priority: "",
  isPinned: false,
  isRead: false,
  date: "",
  createdTime: 0,
  editedTime: null,
  id: "",
  type: "",
};
