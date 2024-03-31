import express from "express";
import cors from "cors";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import compression from "compression";
import multer from "multer";
import dotenv from "dotenv";
import connection from "./mysql.js";
dotenv.config();
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.development" });
} else {
  dotenv.config({ path: ".env.production" });
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "..", "dist")));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads"))
);
const PORT = process.env.APP_LOCALPORT || 3100;
const LOCALHOST = process.env.APP_HOST;
const allowedOrigins = [`http://${LOCALHOST}:${PORT}`];
app.use(cors({ origin: allowedOrigins }));

app.get("/api/note/:noteType", (req, res) => {
  const type = req.params.noteType;
  const query = "SELECT * FROM note.notes WHERE type = ?";
  connection.query(query, [type], (err, results) => {
    if (err) {
      res.status(500).send("Error querying the database");
    } else {
      res.json(results);
    }
  });
});

app.post("/api/note/create", (req, res) => {
  const { title, content, color, priority, createdTime } = req.body;
  const query =
    "INSERT INTO notes (title,content,color,priority,createdTime) VALUES (?,?,?,?,?)";

  connection.query(
    query,
    [title, content, color, priority, createdTime],
    (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        return res.status(500).send("Error creating new note");
      }
      res.status(200).send({
        message: "Note created successfully",
        noteId: results.insertId,
      });
    }
  );
});

app.put("/api/note/update/:noteId", (req, res) => {
  const { noteId } = req.params;
  const { note } = req.body;
  const { title, content, isPinned, priority, color } = note;

  const query =
    "UPDATE notes SET title = ?, content = ?, isPinned= ?, priority= ?, color= ? WHERE id = ?";
  connection.query(
    query,
    [title, content, isPinned, priority, color, noteId],
    (error, results) => {
      if (error) {
        console.error("Error updating note:", error);
        return res.status(500).send("Error updating note");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Note not found");
      }
      res.status(200).send({ message: "Note updated successfully" });
    }
  );
});

app.delete("/api/note/delete/:noteId", (req, res) => {
  const noteId = req.params.noteId;

  const query = "DELETE FROM notes WHERE id = ?";

  connection.query(query, [noteId], (error, results) => {
    if (error) {
      console.error("Error deleting note:", error);
      return res.status(500).send("Error deleting note");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Note not found");
    }

    res.status(200).send({ message: "Note deleted successfully" });
  });
});

app.patch("/api/note/move/:noteId", (req, res) => {
  const { type } = req.body;
  const noteId = req.params.noteId;
  const query = "UPDATE notes SET type = ? WHERE id = ?";

  connection.query(query, [type, noteId], (error, results) => {
    if (error) {
      console.error("Error updating note:", error);
      return res.status(500).send("Error updating note");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Note not found");
    }

    res.status(200).send({ message: "Note updated successfully" });
  });
});

app.patch("/api/note/pin/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const query = "UPDATE notes SET isPinned = NOT isPinned WHERE id = ?";

  connection.query(query, [noteId], (error, results) => {
    if (error) {
      console.error("Error updating note:", error);
      return res.status(500).send("Error updating note");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Note not found");
    }

    res.status(200).send({ message: "Note updated successfully" });
  });
});

app.patch("/api/note/priority/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const query = "UPDATE notes SET isPinned = NOT isPinned WHERE id = ?";

  connection.query(query, [noteId], (error, results) => {
    if (error) {
      console.error("Error updating note:", error);
      return res.status(500).send("Error updating note");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Note not found");
    }

    res.status(200).send({ message: "Note updated successfully" });
  });
});

/**
 *
 * Quill editor API
 *
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    // 원래 파일의 확장자를 가져와서 저장
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `/upload/${req.file.filename}`;
  res.json({ imageUrl });
});

app.post("/deleteImage", (req, res) => {
  const { imageUrl } = req.body;
  fs.unlink(`.${imageUrl}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting image");
    }
    res.status(200).send("Image delete successfully");
  });
});

// app.patch("/api/note/remove/tag", (req, res) => {
//   const removedTagData = req.body;
//   fs.readFile(dbPath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading data file");
//     }
//     try {
//       const allData = JSON.parse(data);

//       const newData = {
//         ...allData,
//         notes: removedTagData,
//       };

//       fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
//         if (err) {
//           console.error("Error writing to file:", err);
//           return res.status(500).send("Error writing data file");
//         }
//         res.status(200).send({ message: "Note deleted successfully" });
//         // res.json(newData);
//       });
//     } catch (parseError) {
//       res.status(500).send("Error parsing JSON data");
//     }
//   });
// });

/***
 *
 * tag 관련 api
//  */

// app.get("/api/tag/alltags", (req, res) => {
//   fs.readFile(dbPath, "utf8", (err, data) => {
//     if (err) {
//       res.status(500).send("Error 1reading data file");
//       return;
//     }
//     try {
//       const { tags } = JSON.parse(data);
//       if (tags) {
//         res.json(tags);
//       } else {
//         res.status(500).send("No notes data found");
//       }
//     } catch (parseError) {
//       res.status(500).send("Error parsing JSON data");
//     }
//   });
// });

// app.post("/api/tag/update", (req, res) => {
//   const newTag = req.body;
//   fs.readFile(dbPath, "utf8", (err, data) => {
//     if (err) {
//       res.status(500).send("Error 1reading data file");
//       return;
//     }
//     try {
//       const allData = JSON.parse(data);
//       const newData = { ...allData, tags: [...allData.tags, newTag] };
//       fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
//         if (err) {
//           console.error("Error writing to file:", err);
//           return res.status(500).send("Error writing data file");
//         }
//         res.status(200).send({ message: "Tag created successfully" });
//       });
//     } catch (parseError) {
//       res.status(500).send("Error parsing JSON data");
//     }
//   });
// });

// app.delete("/api/tag/delete/:tagName", (req, res) => {
//   const tagName = req.params.tagName;
//   fs.readFile(dbPath, "utf8", (err, data) => {
//     if (err) {
//       res.status(500).send("Error 1reading data file");
//       return;
//     }
//     try {
//       const allData = JSON.parse(data);
//       const deletedTag = allData.tags.filter(({ tag }) => tag !== tagName);
//       const newData = { ...allData, tags: deletedTag };

//       fs.writeFile(dbPath, JSON.stringify(newData), (err) => {
//         if (err) {
//           console.error("Error writing to file:", err);
//           return res.status(500).send("Error writing data file");
//         }
//         res.status(200).send({ message: "Tag deleted successfully" });
//       });
//     } catch (parseError) {
//       res.status(500).send("Error parsing JSON data");
//     }
//   });
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
