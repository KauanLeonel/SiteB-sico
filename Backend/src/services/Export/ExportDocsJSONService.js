import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export class ExportDocsJSONService {
    async execute() {
        const docs = await prisma.docs.findMany();

        if (!docs.length)
            throw new Error("Nenhum documento encontrado.");

        const filePath = path.resolve("exports/docs.json");

        fs.writeFileSync(filePath, JSON.stringify(docs, null, 2));

        return { message: "JSON gerado com sucesso!", filePath };
    }
}
