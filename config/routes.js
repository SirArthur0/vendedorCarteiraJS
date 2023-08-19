
module.exports = app => {
    app.route('/vendedor')
        .post(app.api.vendedor.save)

    app.route('/vendedor/:id')
        .post(app.api.vendedor.update)

    app.route('/vendedor/todos')
        .get(app.api.vendedor.getAll)

    app.route('/revenda')
        .post(app.api.revenda.save)

    app.route('/revenda/:id')
        .post(app.api.revenda.update)
    
    app.route('/revenda/todos')
        .get(app.api.revenda.getAll)

    app.route('/carteira')
        .post(app.api.carteira.save)

    app.route('/carteira/update')
        .post(app.api.carteira.update)
}