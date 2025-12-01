import { Router } from "express";

import { ExportAddressCSVService } from "../services/Export/ExportAddressCSVService.js";
import { ExportDocsJSONService } from "../services/Export/ExportDocsJSONService.js";
import { ExportUsersPDFService } from "../services/Export/ExportUsersPDFService.js";

const router = Router();

router.get("/export/address/csv", async (req, res) => {
    try {
        const service = new ExportAddressCSVService();
        const result = await service.execute();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/export/docs/json", async (req, res) => {
    try {
        const service = new ExportDocsJSONService();
        const result = await service.execute();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/export/users/pdf", async (req, res) => {
    try {
        const service = new ExportUsersPDFService();
        const result = await service.execute();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
