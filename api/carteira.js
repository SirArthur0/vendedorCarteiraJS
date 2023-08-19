
module.exports = app => {

    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const carteira = { ...req.body }
        if(req.params.id) carteira.id = req.params.id

        try {
            existsOrError(carteira.revendaId, 'Id da revenda nao informada')
            existsOrError(carteira.vendedorId, 'Id do vendedor nao informado')
        
            const revendaFromDB = await app.db('revenda')
                .where({ id: carteira.revendaId })
            if(!carteira.revendaId){
                notExistsOrError(revendaFromDB, 'Revenda nao localizada')
            }

            const vendedorFromDB = await app.db('vendedor')
                .where({ id: carteira.vendedorId })
            if(!carteira.vendedorId){
                notExistsOrError(vendedorFromDB, 'Vendedor nao localizado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        app.db('carteira')
            .insert(carteira)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))

    }

    const update = async (req, res) => {
        const carteira = { ...req.body }
        if(req.params.id) carteira.id = req.params.id
        
        if(carteira.revendaId) {
            app.db('carteira')
                .update({ vendedorId: carteira.vendedorId })
                .where({ revendaId: carteira.revendaId })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    return { save, update }

}