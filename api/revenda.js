module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const revenda = { ...req.body }
        if(req.params.id) revenda.id = req.params.id 

        try {
            existsOrError(revenda.nome, 'Nome nao informado')
            existsOrError(revenda.cnpj, 'CNPJ nao informado')
            existsOrError(revenda.mpnid, 'mpn id nao informado')
            existsOrError(revenda.desconto, 'desconto nao informado')

            const revendaFromDB = await app.db('revenda')
                .where({ cnpj: revenda.cnpj }).first()
            if (!revenda.db) {
                notExistsOrError(revendaFromDB, 'Usuario ja cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(!revenda.id) {
            app.db('revenda')
            .insert(revenda)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }

    }

    const update = async (req, res) => {
        const revenda = { ...req.body }
        if(req.params.id) revenda.id = req.params.id

        if(revenda.id){
            app.db('revenda')
                .update({ desconto: revenda.desconto })
                .where({ id: revenda.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const getAll = (req, res) => {
        app.db('revenda')
            .select('nome', 'cnpj', 'mpnid', 'desconto')
            .then(revenda => res.json(revenda))
            .catch(err => res.status(500).send(err))
    } 



    return { save, update, getAll }

}