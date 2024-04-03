import axios, { AxiosError } from "axios";
import { Note } from "../types/note";
import { Tag } from "../types/tag";
import { NotesList } from "../recoil/atoms/notesListState";

export const getAllNoteList = {
  getNotes: async (type: string) => {
    try {
      const response = await axios.get(`/api/note/${type}`);
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
      const response = await axios.post(`/api/note/create`, note);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
};

export const updateNote = {
  update: async (note: Note) => {
    try {
      const response = await axios.put(`/api/note/update/${note.id}`, { note });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  move: async (type: string, id: number) => {
    try {
      const response = await axios.patch(`/api/note/move/${id}`, {
        type,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  pin: async (note: Note) => {
    try {
      const response = await axios.patch(`/api/note/pin/${note.id}`, note);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  priority: async (note: Note) => {
    try {
      const response = await axios.patch(`/api/note/priority/${note.id}`, note);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  delete: async (id: number) => {
    try {
      const response = await axios.delete(`/api/note/delete/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  removeTag: async (note: NotesList) => {
    try {
      const response = await axios.patch(`/api/note/remove/tag`, note);
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
      const { data } = await axios.get(`/api/tag/alltags`);
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
      const response = await axios.post(`/api/tag/update`, tag);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
  delete: async (tag: Tag) => {
    try {
      const response = await axios.delete(`/api/tag/delete/${tag.tag}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log("Error", axiosError.message);
      throw error;
    }
  },
};

/**
 *
 * quill image
 *
 */

export const imageToServer = {
  create: async (file: any) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data } = response;
      return data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  },
  delete: async (imageUrl: string) => {
    try {
      axios.post(`/deleteImage`, {
        imageUrl,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  },
};
