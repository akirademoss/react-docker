const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./_middleware/error-handler');
//test
const jwt = require('jsonwebtoken')
const router = express.Router();
const validateRequest = require('./_middleware/validate-request');
const authorize = require('./_middleware/authorize')
const userService = require('./users/user.service');
const Joi = require('joi');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/profile', require('./profile/profile.controller'))
app.use('/follow', require('./follow/follow.controller'))
/*
app.post('/register', async (req,res, next) => {
    try{
      //password stuff
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      console.log(salt)
      console.log(hashedPassword)
      console.log("test")
      console.log(req.body.username)
      //creates schema object
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
      });

      //validate
      validateRequest(req, next, schema);

      userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(err => res.send());
      


      res.status(201).send()
    } catch {
      res.status(500).send()
    }
  })

  app.get('/', (req, res, next) =>{
    authorize()
    userService.getAll()
    .then(users => res.json(users))
    .catch(next);
  })
*/

// global error handler
app.use(errorHandler);

//cors
app.use(cors({
  origin: 'http://127.0.0.1:3000',
}))

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));