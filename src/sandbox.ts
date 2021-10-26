import robinhood from "robinhood";

(async () => {
    const rh = robinhood({
        username: "ethanplee14@gmail.com",
        password: "Et@n42299400"
    }, function() {
        console.log("Token: " + rh.auth_token())
        rh.positions((err, res, body) => {
            if (err)
                console.error(err)
            else {
                console.log(body)
            }
        })
    })
})()

