import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export class ExportAddressCSVService {
    async execute() {
        const addresses = await prisma.address.findMany({
            include: { user: true }
        });

        if (!addresses.length)
            throw new Error("Nenhum endereço encontrado.");

        const header = "id,cpf,nome,rua,numero,bairro,cidade,cep\n";

        const rows = addresses.map(a =>
            `${a.id},${a.user.cpf},${a.user.name},${a.street},${a.number},${a.bairro},${a.city},${a.zip}`
        ).join("\n");

        const csvContent = header + rows;

        const filePath = path.resolve("exports/address_list.csv");

        fs.writeFileSync(filePath, csvContent);

        return { message: "CSV gerado com sucesso!", filePath };
    }
}
