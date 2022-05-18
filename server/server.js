if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const { Pool, Client } = require('pg')

const initializePassport = require('./passport-config');
const nodemailer = require('./nodemailer-config');



initializePassport(
    passport,
    login => executeQuery(
        `SELECT u.id_user, u.status, v.password FROM db.app_user u 
        JOIN db.verification v on v.id_user = u.id_user
        WHERE v.login = $1`,
        [
            login
        ]
    ),
    id => executeQuery(
        `SELECT name, surname, email FROM db.app_user u 
        WHERE u.id_user = $1`,
        [
            id
        ]
    )
);

app.set('view-engine', 'ejs');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(express.static('public')); 
app.use('/img', express.static('img'));

app.use( function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const pool = new Pool({
    user: 'ltkdngtt',
    host: 'hattie.db.elephantsql.com',
    database: 'ltkdngtt',
    password: 'xTmC3Rtx9MgSDJ3PSqRbnc5Ow1cEVDtg',
    port: 5432,
    multipleStatements: true
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

app.get("/baza", (req,res) => {
    pool
    .connect()
    .then(async client => {
        try {
            const resp = await client
                .query('SELECT * FROM  db.Notice n join db.Notice_status ns on n.id_status=ns.id_status');
            console.log(resp.rows);
            res.status(200).send(resp.rows);
            client.release();
        } catch (err_1) {
            client.release();
            console.log(err_1.stack);
        }
  })
  
})
app.get("/organizacje", (req,res) => {

    pool
    .connect()
    .then(async client => {
        try {

            const resp = await client
                .query('SELECT * FROM  db.organization');

            console.log(resp.rows);
            res.status(200).send(resp.rows);
            client.release();
        } catch (err_1) {
            client.release();
            console.log(err_1.stack);
        }
  })
  

});

app.get("/bazaOgloszenUsera",checkNotAuthenticated, (req,res) => {
    pool
    .connect()
    .then(async client => {
        try {
            const id =req.user
            console.log("to id usera",id)
            const resp = await client
                .query('SELECT * FROM  db.Notice n join db.Notice_status ns on n.id_status=ns.id_status WHERE n.id_user=$1',[id]);
            console.log(resp.rows);
            res.status(200).send(resp.rows);
            client.release();
        } catch (err_1) {
            client.release();
            console.log(err_1.stack);
        }
  })
  
})

app.get("/details/:id", (req,res) => {
    pool
    .connect()
    .then(async client => {
        try {
            const id = req.params.id
                console.log("id to uptade", id);
            const resp = await client
                .query('SELECT * FROM  db.Notice n join db.Notice_status ns on n.id_status=ns.id_status join db.Notice_details nd on n.id_notice=nd.id_notice WHERE n.id_notice=$1',[id]);
            console.log(resp.rows);
            res.status(200).send(resp.rows);
            console.log("database notice detials");
            client.release();
        } catch (err_1) {
            client.release();
            console.log(err_1.stack);
        }
  })
  
})

let tokens = []

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res, next) {
    console.log('\n------------------------------\n');
    console.log(req.user);
    console.log('\n------------------------------\n');
    // user_data.push(req.user);
    // req.flash('user', req.user);
    // res.redirect('/');
    // res.user = req.user;
    res.status(200).json(req.user);
    // return next({user: req.user});
  });

app.get('/testtest', (req, res) => {
    res.status(200).send(user_data);
});

function executeQuery(query, values, callback) {
    return new Promise(function (fulfill, reject) {
        pool
        .connect()
        .then(async client => {
            try {
                const resp = await client
                    .query(query, values);
                console.log('-----\tIN\t-----');
                let out = null
                if (resp.rows.length > 0) {
                    out = resp.rows
                } else {
                    console.log('No response data');
                }
                console.log("Successful db operation");
                console.log(out);
                console.log('-----\tOUT\t-----');
                client.release();
                fulfill(out);
                reject(null);
            } catch (err_1) {
                client.release();
                console.log('-----\tERROR!!!\t-----');
                console.log(err_1.message);
                console.log('-----\tERROR!?!\t-----');
                fulfill(null);
                reject(null);
            }
        });
    });
};

app.get("/changeToReservation/:id", (req,res) => {  
        pool
        .connect()
        .then(async client => {
            try {
                const id = req.params.id
                console.log("id to uptade", id);
                const resp = await client
                    .query('UPDATE db.Notice SET id_status=\'RES\' WHERE id_notice=$1 ; ', [id]);
                console.log(resp.rows);
                res.status(200).send(resp.rows);
                console.log("database updated", id);
                client.release();
            } catch (err_1) {
                client.release();
                console.log(err_1.stack);
            }
      })
      
    })



    app.get("/updateNoticeHistory/:id", (req,res) => {  
        pool
        .connect()
        .then(async client => {
            try {
                const id = req.params.id
                console.log("id to uptade", id);
                const resp = await client
                    .query('INSERT INTO db.Activity (id_notice, id_history, type, date, activity_description) VALUES ($1, 1, \'wpis\', GETDATE(), \'Rezerwacja ogloszenia\' );; ', [id]);
                console.log(resp.rows);
               
                res.status(200).send(resp.rows);
                
                console.log("database updated", id);
                client.release();
            } catch (err_1) {
                client.release();
                console.log(err_1.stack);
            }
      })
      
    })

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        token += req.body.login;
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length)];
        }
        executeQuery(
            `INSERT INTO db.app_user (name, surname, email, status) VALUES ($1, $2, $3, 'Pending') returning id_user`,
            [
                req.body.name,
                req.body.surname,
                req.body.email
            ]
        ).then(function(out) {
            if (out != null) {
                console.log(out[0].id_user);
                executeQuery(
                    `INSERT INTO db.authentication VALUES ($1, $2)`,
                    [
                        out[0].id_user,
                        token
                    ]
                );
                executeQuery(
                    `INSERT INTO db.verification VALUES ($1, $2, $3)`,
                    [
                        out[0].id_user,
                        req.body.login,
                        hashedPassword
                    ]
                );
                nodemailer.sendConfirmationEmail(req.body.name, req.body.email, token);
                res.redirect('/login');
            } else {
                res.redirect('/register');
            }
        });
    } catch {
        res.redirect('/register');
    }
});

app.get('/confirm/:authentication_string', (req, res) => {
    executeQuery(
        'SELECT id_user FROM db.authentication where authentication_string = $1',
        [
            req.params.authentication_string
        ]
    ).then(function(out) {
        if (out != null) {
            executeQuery(
                `UPDATE db.app_user SET status = 'Active' WHERE id_user = $1 RETURNING id_user`,
                [
                    out[0].id_user
                ]
            ).then(function(id) {
                if (id != null) {
                    executeQuery(
                        `DELETE FROM db.authentication WHERE id_user = $1 RETURNING id_user`,
                        [
                            id[0].id_user
                        ]
                    );
                    res.redirect('/login');
                } else {
                    console.log('No user in DB');
                    res.redirect('/register');
                }
            });
        } else {
            console.log('No auth_string in DB');
            res.redirect('/register');
        }
    });
});

app.get("/api", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({"users":["userOne", "userTwo", "userTree"] });
});

app.get("/api/getUserData", (req, res) => {
    
    try {
        let fname = "Bilbo";
        let lname = "Baggins";
        let data = {
                firstName: fname,
                lastName: lname
        };
        console.log("userData sended");
        res.status(200).send(data);
    } catch {
        console.log("Sth gone wrong");
        res.end();
    }
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        return next();
    }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Use http://localhost:${PORT}`);
});