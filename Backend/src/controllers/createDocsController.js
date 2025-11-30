import { PrismaClient } from "@prisma/client";
import { create as createDocs, docsValidator } from "../model/docsModel.js";

const prisma = new PrismaClient();

export default async function createDocsController(req, res, next) {
  try {
    const docs = req.body;

    // Validação
    const validated = docsValidator(docs);

    if (!validated.success) {
      return res.status(400).json({
        message: "Erro ao cadastrar documentos",
        errors: validated.error.flatten().fieldErrors
      });
    }

    const docsValidated = validated.data;

    // Verifica se o usuário existe pelo CPF
    const existingUser = await prisma.user.findUnique({
      where: { cpf: docsValidated.cpf }
    });

    if (!existingUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica se Docs já existem
    const existingDocs = await prisma.docs.findUnique({
      where: { userId: existingUser.id }
    });

    if (existingDocs) {
      return res.status(409).json({ message: "Documentos já cadastrados" });
    }

    // Cria os documentos vinculados ao usuário
    const result = await createDocs({
      rg: docsValidated.rg,
      cnh: docsValidated.cnh,
      userId: existingUser.id
    });

    return res.status(201).json({
      message: "Documentos cadastrados com sucesso",
      docs: result
    });

  } catch (error) {
    next(error);
  }
}
