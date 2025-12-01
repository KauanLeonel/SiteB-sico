import express from "express";
import path from "path";

const router = express.Router();

router.get("/download", (req, res) => {
    const file = req.query.file;

    if (!file) {
        return res.status(400).json({ error: "Arquivo não especificado" });
    }

    return res.download(path.resolve(file));
});

export default router;
