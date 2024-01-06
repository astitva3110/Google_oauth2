const express =require('express');
const path=require('path');
const passport=require('passport');
const session = require('express-session');
const app =express();
const auth=require('./login');
const { Session } = require('inspector');
app.use(express.static(path.join(__dirname,'client')));
app.set('views','views');
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index');
});
app.use(session({
    secret: 'mysecret-is-secure-in-the-code-do-not-take-tesion',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/auth');
  });

  app.get('/login',(req,res)=>{
    res.send('Something is wrong')
  })
  app.get('/auth',(req,res)=>{
    res.send('hello ${name}');
  })

app.listen(3000,()=>{
    console.log("server is connected")
});