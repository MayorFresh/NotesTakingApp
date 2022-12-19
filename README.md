# NotesTakingApp
An app that allows a user to perform basic note taking operations using Node.js with certain authentications 

Once you have cloned this repo

- open the package.json file to check all the dependencies 
- open the terminal and download all the dependencies using the following command:
 

```
 npm install dependencies 

```
Examples of dependencies:

```
nodemon
express
bcrypt
mongoose

```

create a ".env" file in the root folder and set the following:

```

1. PORT=4000
2. TOKEN_KEY='your desired token key'
3. USER='yourenailaddress'
4. PASS='youremailpassword'

```

After all this are in place, then run the app using either of these commands 

```
nodemon index 
node index.js

```
The api route used can be found in the index.js file 
Which is 

```
api/v1/notesapp
```
The other respective routes are added to it from the routes/user.js


