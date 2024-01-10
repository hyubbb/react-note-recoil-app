import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import { env } from "process";
const app = express();

const dbPath = path.join("./src/server", "./db.json");

const PORT = env.PORT || 3100;
// JSON 요청 본문을 파싱하기 위한 미들웨어
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// middleware ; request.body로 간단하게 사용할 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));

app.get("/", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error 1reading data file");
      return;
    }
    try {
      const noteData = JSON.parse(data);
      if (noteData.notes) {
        res.json(noteData.notes);
      } else {
        res.status(500).send("No notes data found");
      }
      res.status(200).send({ message: "Note create successfully" });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.get("/api/note/allnotes", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error 1reading data file");
      return;
    }
    try {
      const noteData = JSON.parse(data);
      if (noteData.notes) {
        res.json(noteData.notes);
      } else {
        res.status(500).send("No notes data found");
      }
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.get("/note/:noteType", (req, res) => {
  const noteType = req.params.noteType + "Notes";
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data file");
      return;
    }
    try {
      const noteData = JSON.parse(data);
      if (noteData.notes[noteType]) {
        res.json(noteData.notes[noteType]);
      } else {
        res.status(500).send("No notes data found");
      }
      res.status(200).send({ message: "Note create successfully" });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.post("/api/note/create", (req, res) => {
  const noteData = req.body; // 요청 본문에서 type 추출
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data file");
    }

    try {
      const allData = JSON.parse(data);
      const updatedNote = {
        ...allData.notes,
        mainNotes: [...allData.notes.mainNotes, noteData],
      };

      const newNote = {
        ...allData,
        notes: updatedNote,
      };
      fs.writeFile(dbPath, JSON.stringify(newNote), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Error writing data file");
        }
        // res.redirect("/");
        res.status(200).send({ message: "Note create successfully" });
      });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.post("/api/note/move/:noteType", (req, res) => {
  const to = req.params.noteType;
  const { from, note: postNote } = req.body; // 요청 본문에서 type 추출

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data file");
    }

    try {
      const allData = JSON.parse(data);
      allData.notes[from] = allData.notes[from].filter(
        (note) => note.id !== postNote.id
      );
      allData.notes[to] = [...allData.notes[to], postNote];

      const newNote = { ...allData, notes: allData.notes };

      fs.writeFile(dbPath, JSON.stringify(newNote), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Error writing data file");
        }
        res.status(200).send({ message: "Note move successfully" });
      });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.put("/api/note/update/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const { note: newNote, pathname } = req.body;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data file");
    }
    try {
      const allData = JSON.parse(data);
      const changedNotes = allData.notes[pathname].map((note) => {
        const typeOfNoteId = typeof note.id === "number" ? +noteId : noteId;
        return note.id === typeOfNoteId ? newNote : note;
      });
      const newData = {
        ...allData,
        notes: { ...allData.notes, [pathname]: changedNotes },
      };
      fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Error writing data file");
        }
        res.status(200).send({ message: "Note update successfully" });
      });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.delete("/api/note/delete/:noteId", (req, res) => {
  const noteId = req.params.noteId;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data file");
    }
    try {
      const allData = JSON.parse(data);
      console.log(noteId);
      const isNumberId = typeof noteId === "number" ? +noteId : noteId;
      console.log(isNumberId);
      const newNotes = allData.notes.trashNotes.filter(
        (note) => note.id !== isNumberId
      );
      const newData = {
        ...allData,
        notes: { ...allData.notes, trashNotes: newNotes },
      };
      fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Error writing data file");
        }
        res.status(200).send({ message: "Note deleted successfully" });
      });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.patch("/api/note/update/pin/:noteId", (req, res) => {
  const oldNote = req.body;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data file");
    }
    try {
      const allData = JSON.parse(data);
      const { notes } = allData;
      // const mainNotes = notes.mainNotes;
      // notes.mainNotes.filter((note) => note.id === noteId ? { ...note, pinned: !note.pinned } : note);

      const newNote = notes.mainNotes.map((note) => {
        return note.id === oldNote.id
          ? { ...note, isPinned: !note.isPinned }
          : note;
      });
      const newData = { ...allData, notes: { ...notes, mainNotes: newNote } };
      fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Error writing data file");
        }
        res.status(200).send({ message: "Note deleted successfully" });
        // res.json(newData);
      });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.patch("/api/note/remove/tag", (req, res) => {
  const removedTagData = req.body;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data file");
    }
    try {
      const allData = JSON.parse(data);

      const newData = {
        ...allData,
        notes: removedTagData,
      };

      fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Error writing data file");
        }
        res.status(200).send({ message: "Note deleted successfully" });
        // res.json(newData);
      });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

/***
 *
 * tag 관련 api
 */

app.get("/api/tag/alltags", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error 1reading data file");
      return;
    }
    try {
      const { tags } = JSON.parse(data);
      if (tags) {
        res.json(tags);
      } else {
        res.status(500).send("No notes data found");
      }
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.post("/api/tag/update", (req, res) => {
  const newTag = req.body;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error 1reading data file");
      return;
    }
    try {
      const allData = JSON.parse(data);
      const newData = { ...allData, tags: [...allData.tags, newTag] };
      fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Error writing data file");
        }
        res.status(200).send({ message: "Tag created successfully" });
      });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.delete("/api/tag/delete/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error 1reading data file");
      return;
    }
    try {
      const allData = JSON.parse(data);
      const deletedTag = allData.tags.filter(({ tag }) => tag !== tagName);
      const newData = { ...allData, tags: deletedTag };

      fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).send("Error writing data file");
        }
        res.status(200).send({ message: "Tag deleted successfully" });
      });
    } catch (parseError) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
