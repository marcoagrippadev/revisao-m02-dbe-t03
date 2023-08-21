const { dados } = require('../../dados')

const listarAulas = (req, res) => {
    const { id } = req.params
    if (isNaN(Number(id))) {
        return res.status(400).json({ mensagem: "O id deve ser um número"})
    }
    const pessoaEncontrada = dados.find(pessoa => pessoa.id === Number(id))
    if (!pessoaEncontrada) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" })
    }
    if (pessoaEncontrada.cargo !== "aluno") {
        return res.status(403).json({ mensagem: "As aulas estão associadas somente a alunos" })
    }
    return res.status(200).json(pessoaEncontrada.aulas)
}

const listarAula = (req, res) => {
    const { id, idAula } = req.params
    if (isNaN(Number(id)) || isNaN(Number(idAula))) {
        return res.status(400).json({ mensagem: "Os campos identificadores devem ser numéricos" })
    }
    const pessoaEncontrada = dados.find(aluno => aluno.id === Number(id))
    if (!pessoaEncontrada) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" })
    }
    if (pessoaEncontrada.cargo !== "aluno") {
        return res.status(403).json({ mensagem: "As aulas estão associadas somente a alunos" })
    }
    const aulaProcurada = pessoaEncontrada.aulas.find(aula => aula.id === Number(idAula))
    if (!aulaProcurada) {
        return res.status(404).json({ mensagem: "Aula não encontrada" })
    }
    return res.status(200).json(aulaProcurada)
}

module.exports = {
    listarAulas,
    listarAula
}