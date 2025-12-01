import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export class ExportUsersPDFService {
    async execute() {
        const users = await prisma.user.findMany({
            select: { name: true }
        });

        if (!users.length)
            throw new Error("Nenhum usuário encontrado.");

        const filePath = path.resolve("exports/users.pdf");

        const pdf = new PDFDocument();
        pdf.pipe(fs.createWriteStream(filePath));

        pdf.fontSize(20).text("Lista de Usuários", { align: "center" });
        pdf.moveDown();

        users.forEach((u, index) => {
            pdf.fontSize(14).text(`${index + 1}. ${u.name}`);
        });

        pdf.end();

        return { message: "PDF gerado com sucesso!", filePath };
    }
}
