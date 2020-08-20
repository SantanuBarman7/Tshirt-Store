var braintree = require("braintree");



var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "4x9x2y7kr27ddxjf",
    publicKey: "dj6j352fd5yx8bzj",
    privateKey: "5a5bb1e790674745f7cbad55482b5414"
});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if(err){
            res.status(500).json(err)
        }else{
            res.json(response)
        }
      });
}

exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(err)
          }else{
              res.json(result)
          }
      });
}