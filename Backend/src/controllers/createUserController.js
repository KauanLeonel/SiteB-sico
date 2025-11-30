import { PrismaClient } from "@prisma/client";
import { create, userValidator } from "../model/userModel.js";

const prisma = new PrismaClient();

export default async function createUserController(req, res, next) {
  try {
    const user = req.body;

    // Validação correta aqui:
    const validated = userValidator(user);

    if (!validated.success) {
      return res.status(400).json({
        message: "Erro ao cadastrar o usuário",
        errors: validated.error.flatten().fieldErrors
      });
    }

    const userValidated = validated.data;

    // Verifica se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: userValidated.email }
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    // Cria o usuário
    const result = await create(userValidated);

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: result
    });

  } catch (error) {
    next(error);
  }
}
