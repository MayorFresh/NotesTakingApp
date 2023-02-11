const option = {
    definition: {
        info:{
            title:"NOTE TAKING APPLICATION",
            description: "A note taking application with necessary authentication, it allows a user to create an account before the user can create, edit, view and delete a note.",
            contact: {
                email: "danielmayotar@gmail.com"
            },   
            version: "1.0.0"
        },
        servers: {
            url: "http://localhost:4000/api/v1/notesapp"
        },
        tags: {
            name: "user",
            description: "Operations about user",
            name: "notes",
            description: "Creating notes associated with each user"
        }
    },
    apis: ["./routes/user.js"]
}

module.exports = option