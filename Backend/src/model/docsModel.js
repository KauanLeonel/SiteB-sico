import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// ======= SCHEMA =======
const docsSchema = z.object({
  cpf: z.string({
    invalid_type_error: "O CPF deve ser uma string.",
    required_error: "O CPF é obrigatório."
  })
  .min(11, { message: "O CPF deve ter exatamente 11 caracteres." })
  .max(11, { message: "O CPF deve ter exatamente 11 caracteres." }),

  rg: z.string({
    invalid_type_error: "O RG deve ser uma string.",
    required_error: "O RG é obrigatório."
  })
  .min(5, { message: "O RG deve ter no mínimo 5 caracteres." })
  .max(20, { message: "O RG deve ter no máximo 20 caracteres." }),

  cnh: z.string({
    invalid_type_error: "A CNH deve ser uma string.",
    required_error: "A CNH é obrigatória."
  })
  .min(5, { message: "A CNH deve ter no mínimo 5 caracteres." })
  .max(20, { message: "A CNH deve ter no máximo 20 caracteres." }),
});


// ======= VALIDATOR =======
export const docsValidator = (docs, partial = null) => {
  if (partial) {
    return docsSchema.partial(partial).safeParse(docs);
  }
  return docsSchema.safeParse(docs);
};


// ======= CRUD =======

// CREATE — cria os documentos
export async function create(data) {
  // Aqui data já contém: rg, cnh, userId
  const result = await prisma.docs.create({
    data
  });
  return result;
}

// DELETE
export async function remove(id) {
  return await prisma.docs.delete({
    where: { id }
  });
}

// LISTAR TODOS
export async function getList() {
  return await prisma.docs.findMany();
}

// UPDATE
export async function update(id, data) {
  return await prisma.docs.update({
    where: { id },
    data
  });
}
