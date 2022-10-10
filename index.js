const express = require('express')
const cors = require('cors')
const bparser = require('body-parser')
const nullParser = require("express-query-null");
require('dotenv').config();

const app = express()
app.use(bparser.json())
app.use(bparser.urlencoded({extended:false}))
app.use(cors({credentials: true, origin: ['http://localhost:3000','http://192.168.15.87:3000','https://easy.psasistemas.com.br']}))
app.use(nullParser());

// Autenticação
const passport = require('passport')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const cookieParser = require('cookie-parser')
/*
app.use(session({
    store: new pgSession({
        conString: process.env.CONSTRING,
        ttl: 30*60
    }),
    cookie: { 
        maxAge: 24*60*60*1000, // 1 dia
        httpOnly:false
    },
    secret: process.env.KEYSESSION,
    saveUninitialized:false,
    resave: false,
  }))

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser(process.env.KEYSESSION))
require('./versoes/v1/utils/passport')(passport)

*/
const interfaceapi = require("./interface")

app.use("/api",interfaceapi)

app.listen(process.env.PORT, () => {
    console.log("Rodando na porta ",process.env.PORT)
})