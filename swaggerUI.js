const option = {
    definition: {
        info:{
            title:"NOTE TAKING APPLICATION",
            description: "A note taking application with necessary authentication, it allows a user to create an account before the user can create, edit, view and delete a note.",
            contact: {
                name: "Mayorfresh",
                email: "danielmayotar@gmail.com"
            },   
            version: "1.0.0"
        },
        schemes: ["http"],
        servers: [
            {
                url: "http://localhost:4000/api/v1/notesapp",
                description: "Local Server"
            },
        ],
        tags: [
            {
                name: "notes",
                description: "Operations about user",
                name: "user",
                description: "Creating notes associated with each user", 
            }
        ],
    },
    apis: ["./routes/user.js"]
}

module.exports = option