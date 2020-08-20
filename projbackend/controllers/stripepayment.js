const Stripe = require("stripe")("sk_test_51HCPRjLlmOhjHTc8yVL8EpGer3mUG7VEW0X98vmWKySCsn8MzuN8hBbYWyD7E031O5Rblr6lnhxqw8a3vWpXICBf00sFEWylnd")
const uuid = require("uuid/v4")

exports.makepayment = (req,res) => {
    const {products, token} = req.body
    console.log("products", products)

    let amount = 0
    products.map ( p=> {
        amount = amount + p.price
    })

    const idempotencyKey =uuid()

    return Stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        Stripe.charges.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",
            /*shipping: {
                name: token.card.name,
                address:{
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }
            }*/
        }, {idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
    })
}