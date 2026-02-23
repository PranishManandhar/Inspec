const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = jwt.sign(
    {id:999,username:'never_delete_me',role:'verifier'},
    process.env.JWT_SECRET
);

console.log(token);

//this was used to generate a token for public use with no limit please do not delete this