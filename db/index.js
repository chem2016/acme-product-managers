const Sequelize = require('sequelize')

const conn = new Sequelize(process.env.DATABASE_URL)

const User = conn.define('user', {
    name: Sequelize.STRING
})

const Product = conn.define('product', {
    name: Sequelize.STRING
})

Product.belongsTo(User, {as: "manager"} )

const syncAndSeed = () => {
    return conn.sync({force: true})
        .then(()=>{
            return Promise.all([
                User.create({name: 'moe'}),
                User.create({name: 'larry'}),
                User.create({name: "curly"}),
                Product.create({name: 'bar', managerId: 1}),
                Product.create({name: 'bazz', managerId: 2}),
                Product.create({name: 'foo', managerId: 3}),
            ])
        })
}

module.exports={
    User,
    Product,
    syncAndSeed
}