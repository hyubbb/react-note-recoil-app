import axios, { AxiosError } from "axios";
import { Note } from "../types/note";
import { Tag } from "../types/tag";
import { NotesList } from "../recoil/atoms/notesListState";

export const getAllNoteList = {
  getNotes: async () => {
    try {
      const response = await axios.get(
        `http://localhost:3100/api/note/allnotes`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError.response.data);
        console.log(axiosError.response.status);
        console.log(axiosError.response.headers);
      } else if (axiosError.request) {
        console.log(axiosError.request);
      } else {
        console.log("Error", axiosError.message);
      }
      throw error;
    }
  },
};

export const setNoteList = {
  create: async (note: Note) => {
    try {
      const response = await axios.post(
        `http://localhost:3100/api/note/create`,
        note
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
};

interface updateNoteType {
  note: Note;
  pathname: string;
}

export const updateNote = {
  update: async ({ note, pathname }: updateNoteType) => {
    console.log(note, pathname);
    try {
      const response = await axios.put(
        `http://localhost:3100/api/note/update/${note.id}`,
        { note, pathname }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  pin: async (note: Note) => {
    try {
      const response = await axios.patch(
        `http://localhost:3100/api/note/update/pin/${note.id}`,
        note
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  removeTag: async (note: NotesList) => {
    try {
      const response = await axios.patch(
        `http://localhost:3100/api/note/remove/tag`,
        note
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
};

/**
 * tags
 *
 */

export const getTags = {
  get: async () => {
    try {
      const { data } = await axios.get(`http://localhost:3100/api/tag/alltags`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError.response.data);
        console.log(axiosError.response.status);
        console.log(axiosError.response.headers);
      } else if (axiosError.request) {
        console.log(axiosError.request);
      } else {
        console.log("Error", axiosError.message);
      }
      throw error;
    }
  },
  update: async (tag: Tag) => {
    try {
      const response = await axios.post(
        `http://localhost:3100/api/tag/update`,
        tag
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  delete: async (tag: Tag) => {
    try {
      const response = await axios.delete(
        `http://localhost:3100/api/tag/delete/${tag.tag}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
};
