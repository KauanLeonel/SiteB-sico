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
    // NOTE: no seu schema 'Docs' usa userCpf como FK, não userId.
    const docs = await prisma.docs.create({
      data: {
        rg,
        cnh,
        userCpf: user.cpf   // usar o campo correto do schema
      }
    });

    // 3. Criar endereço
    // NOTE: Address também usa userCpf no seu schema.
    const address = await prisma.address.create({
      data: {
        bairro,
        rua,
        userCpf: user.cpf   // usar o campo correto do schema
      }
    });

    return {
      message: "Cadastro finalizado com sucesso!",
      docs,
      address
    };
  }
}
