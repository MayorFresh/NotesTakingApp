const option = {
    definition: {
        info:{
            title:"NOTE TAKING APPLICATION",
            description: `A note taking application with necessary authentication that allows a user to create an account before the user can perform any of the note operations.\n
            MODE OF OPERATION\n
            1. The user should fill in the required details to create an account 
            2. A confirmation email will be sent to the user's email where the user can confirm his/her account status
            3. A user can then proceed to signin with the registered details
            4. A response will be received which contains the signin token
            5. The token should be copied and put in the Authorize spot at the top right corner of the webpage
            6. The syntax to puting the token is "Bearer <token>". where <token> is the copied token from signin
            7. Then a signed in user can proceed to perform the Notes operation. 
            `,
            contact: {
                name: "Mayowa Daniel",
                email: "danielmayotar@gmail.com"
            },   
            version: "1.0.0"
        },
        schemes: ["http", "https"],

        tags: [
            {
                name: "user",
                description: "Operations about user", 
            },
            {
                name: "notes",
                description: "Creating notes associated with each user",
            }
        ],
        securityDefinitions: {
            bearerAuth:  {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'Enter your bearer token in the format "Bearer {token}"',
            }              
        },   
    },
    apis: ["./routes/user.js"]
}

module.exports = option