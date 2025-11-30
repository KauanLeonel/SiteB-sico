import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class FinalizarCadastroService {
  async execute({ cpf, rg, cnh, bairro, rua }) {

    // 1. Buscar usuário pelo CPF
    const user = await prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) {
      throw new Error("Usuário não encontrado pelo CPF.");
    }

    // 2. Criar documentos
    const docs = await prisma.docs.create({
      data: {
        rg,
        cnh,
        userId: user.id
      }
    });

    // 3. Criar endereço
    const address = await prisma.address.create({
      data: {
        bairro,
        rua,
        userId: user.id
      }
    });

    return {
      message: "Cadastro finalizado com sucesso!",
      docs,
      address
    };
  }
}
