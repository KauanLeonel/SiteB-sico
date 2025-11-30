import { PrismaClient } from "@prisma/client";
import { create as createAddress, addressValidator } from "../model/addressModel.js";

const prisma = new PrismaClient();

export default async function createAddressController(req, res, next) {
  try {
    const address = req.body;

    // ===== VALIDAÇÃO =====
    const validated = addressValidator(address);

    if (!validated.success) {
      return res.status(400).json({
        message: "Erro ao cadastrar o endereço",
        errors: validated.error.flatten().fieldErrors
      });
    }

    const addressValidated = validated.data;

    // ===== VERIFICA SE USUÁRIO EXISTE =====
    const existingUser = await prisma.user.findUnique({
      where: { cpf: addressValidated.cpf }
    });

    if (!existingUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // ===== VERIFICA SE ENDEREÇO JÁ EXISTE =====
    const existingAddress = await prisma.address.findUnique({
      where: { userId: existingUser.id }
    });

    if (existingAddress) {
      return res.status(409).json({ message: "Endereço já cadastrado" });
    }

    // ===== CRIA ENDEREÇO =====
    const result = await createAddress({
      bairro: addressValidated.bairro,
      rua: addressValidated.rua,
      userId: existingUser.id
    });

    return res.status(201).json({
      message: "Endereço cadastrado com sucesso",
      address: result
    });

  } catch (error) {
    next(error);
  }
}
