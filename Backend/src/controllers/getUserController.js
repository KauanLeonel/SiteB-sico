import { getList } from "../model/userModel.js"

export default async function getUserController(req, res) {

    const result = await getList();
    return res.json(result)
}