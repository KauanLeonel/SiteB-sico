import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// ======= SCHEMA =======
const addressSchema = z.object({
  cpf: z.string({
    invalid_type_error: "O CPF deve ser uma string.",
    required_error: "O CPF é obrigatório."
  })
  .min(11, { message: "O CPF deve ter exatamente 11 caracteres." })
  .max(11, { message: "O CPF deve ter exatamente 11 caracteres." }),

  bairro: z.string({
    invalid_type_error: "O bairro deve ser uma string.",
    required_error: "O bairro é obrigatório."
  })
  .min(2, { message: "O bairro deve ter no mínimo 2 caracteres." })
  .max(80, { message: "O bairro deve ter no máximo 80 caracteres." }),

  rua: z.string({
    invalid_type_error: "A rua deve ser uma string.",
    required_error: "A rua é obrigatória."
  })
  .min(2, { message: "A rua deve ter no mínimo 2 caracteres." })
  .max(100, { message: "A rua deve ter no máximo 100 caracteres." }),
});

// ======= VALIDATOR =======
export const addressValidator = (address, partial = null) => {
  if (partial) {
    return addressSchema.partial(partial).safeParse(address);
  }
  return addressSchema.safeParse(address);
};

// ======= CRUD =======
export async function create(data) {
  // data aqui já deve vir com: bairro, rua, userId
  return await prisma.address.create({
    data
  });
}

export async function remove(id) {
  return await prisma.address.delete({
    where: { id }
  });
}

export async function getList() {
  return await prisma.address.findMany();
}

export async function update(id, data) {
  return await prisma.address.update({
    where: { id },
    data
  });
}
