import express from "express";
import { createServer } from "vite";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import multer from "multer";
import dotenv from "dotenv";
import pool from "./database.js";

async function startServer() {
  dotenv.config();
  if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env.development" });
  } else {
    dotenv.config({ path: ".env.production" });
  }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const app = express();

  // 개발 모드에서만 Vite를 통합합니다.
  if (process.env.NODE_ENV !== "production") {
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // 프로덕션 모드에서는 빌드된 정적 파일을 서빙합니다.
    // app.use(express.static("dist"));
    app.use(express.static(path.join(__dirname, "..", "..", "dist")));
  }

  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true, limit: "2mb" }));
  app.use(compression());

  app.use(
    "/uploads",
    express.static(path.join(__dirname, "..", "..", "/uploads"))
  );
  const PORT = process.env.APP_LOCALPORT || 3100;
  const LOCALHOST = process.env.APP_HOST;
  const allowedOrigins = [`http://${LOCALHOST}:${PORT}`];
  app.use(cors({ origin: allowedOrigins }));

  app.get("/api/note/:noteType", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const type = req.params.noteType;
      const results = await conn.query(
        "SELECT * FROM note.notes WHERE type = ?",
        [type]
      );
      res.json(results);
    } catch (err) {
      console.error("Error querying the database", err);
      res.status(500).send("Error querying the database");
    } finally {
      if (conn) conn.release();
    }
  });

  app.post("/api/note/create", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const { title, content, color, priority, createdTime } = req.body;
      const query =
        "INSERT INTO notes (title, content, color, priority, createdTime) VALUES (?, ?, ?, ?, ?)";
      const results = await conn.query(query, [
        title,
        content,
        color,
        priority,
        createdTime,
      ]);
      res.status(200).send({
        noteId: results.insertId.toString(),
      });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Error creating new note");
    } finally {
      if (conn) conn.release();
    }
  });

  app.put("/api/note/update/:noteId", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const { noteId } = req.params;
      const { title, content, isPinned, priority, color } = req.body.note;
      const query =
        "UPDATE notes SET title = ?, content = ?, isPinned = ?, priority = ?, color = ? WHERE id = ?";
      const results = await conn.query(query, [
        title,
        content,
        isPinned,
        priority,
        color,
        noteId,
      ]);
      if (results.affectedRows === 0) {
        return res.status(404).send("Note not found");
      }
      res.status(200).send({ message: "Note updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).send("Error updating note");
    } finally {
      if (conn) conn.release();
    }
  });

  app.delete("/api/note/delete/:noteId", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const noteId = req.params.noteId;
      const query = "DELETE FROM notes WHERE id = ?";
      const results = await conn.query(query, [noteId]);
      if (results.affectedRows === 0) {
        return res.status(404).send("Note not found");
      }
      res.status(200).send({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).send("Error deleting note");
    } finally {
      if (conn) conn.release();
    }
  });
  app.patch("/api/note/move/:noteId", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const { type } = req.body;
      const noteId = req.params.noteId;
      const query = "UPDATE notes SET type = ? WHERE id = ?";
      const results = await conn.query(query, [type, noteId]);
      if (results.affectedRows === 0) {
        return res.status(404).send("Note not found");
      }
      res.status(200).send({ message: "Note updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).send("Error updating note");
    } finally {
      if (conn) conn.release();
    }
  });

  app.patch("/api/note/pin/:noteId", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const noteId = req.params.noteId;
      const query = "UPDATE notes SET isPinned = NOT isPinned WHERE id = ?";
      const results = await conn.query(query, [noteId]);
      if (results.affectedRows === 0) {
        return res.status(404).send("Note not found");
      }
      res.status(200).send({ message: "Note updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).send("Error updating note");
    } finally {
      if (conn) conn.release();
    }
  });

  app.patch("/api/note/priority/:noteId", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const noteId = req.params.noteId;
      // 가정: priority 업데이트 로직이 동일한 방식으로 작동한다고 가정합니다.
      const query = "UPDATE notes SET priority = NOT priority WHERE id = ?";
      const results = await conn.query(query, [noteId]);
      if (results.affectedRows === 0) {
        return res.status(404).send("Note not found");
      }
      res.status(200).send({ message: "Note updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).send("Error updating note");
    } finally {
      if (conn) conn.release();
    }
  });

  /**
   *
   * Quill editor API
   *
   */

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      // 원래 파일의 확장자를 가져와서 저장
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now() + ext);
    },
  });

  const upload = multer({ storage: storage });

  app.post("/upload", upload.single("image"), (req, res) => {
    const imageUrl = `/uploads/${req.file.filename}`;
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

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "dist/index.html"));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
