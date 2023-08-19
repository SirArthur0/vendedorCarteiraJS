const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const vendedor = { ...req.body }
        if (req.params.id) vendedor.id = req.params.id

        try {
            existsOrError(vendedor.nome, 'Nome nao informado')
            existsOrError(vendedor.email, 'Email nao informado')
            existsOrError(vendedor.password, 'Senha nao informada')
            existsOrError(vendedor.confirmPassword, 'Senha invalida')
            equalsOrError(vendedor.password, vendedor.confirmPassword, 'Senhas nao conferem')

            const vendedorFromDB = await app.db('vendedor')
                .where({ email: vendedor.email }).first()
            if (!vendedor.id) {
                notExistsOrError(vendedorFromDB, 'Usuario ja cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        vendedor.password = encryptPassword(vendedor.password)
        delete vendedor.confirmPassword

        if(!vendedor.id) {
            app.db('vendedor')
                .insert(vendedor)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        
    }

    const update = async (req, res) => {
        const vendedor = { ...req.body }
        if (req.params.id) vendedor.id = req.params.id

            if (vendedor.id && vendedor.nome && vendedor.email) {
                app.db('vendedor')
                    .update({ nome: vendedor.nome, email: vendedor.email })
                    .where({ id: vendedor.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))

            } else if (vendedor.id && vendedor.nome) {
                app.db('vendedor')
                    .update({ nome: vendedor.nome })
                    .where({ id: vendedor.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))

            } else if (vendedor.id && vendedor.email) {
                app.db('vendedor')
                    .update({ email: vendedor.email })
                    .where({ id: vendedor.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else {
                return res.status(400).send()
            }
    }

    const getAll = (req, res) => {
        app.db('vendedor')
            .select('nome', 'email')
            .then(vendedor => res.json(vendedor))
            .catch(err => res.status(500).send(err))
    }   

    return { save, update, getAll }

}