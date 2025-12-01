import { FinalizarCadastroService } from "../services/User/FinalizarCadastroService.js";

export class FinalizarCadastroController {
  async handle(req, res) {
    const { cpf, rg, cnh, bairro, rua } = req.body;

    const service = new FinalizarCadastroService();

    try {
      const result = await service.execute({
        cpf,
        rg,
        cnh,
        bairro,
        rua
      });

      return res.status(201).json(result);

    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
