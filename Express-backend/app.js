const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my.db',
    define: {
        timestamps: false
    }
})
 
let Student = sequelize.define('student', {
    name : {
    type: Sequelize.STRING,
    allowNull: false
    },
    email : Sequelize.STRING,
    password : Sequelize.STRING,
    team : Sequelize.STRING
})

let Team = sequelize.define('team',{
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    linkProject: Sequelize.STRING
})

const app = express()
app.use(express.json())
var cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}));
// TODO

app.get('/create', async (req, res, next) => {
    try {
      await sequelize.sync({ force: true })
      res.status(201).json({ message: 'Database created with the models.' })
    } catch (err) {
      next(err)
    }
  })

/**
 * GET all the students from the database.
 */
app.get('/students', async (req, res) => {
    try{
        let students = await Student.findAll()
        res.status(200).json(students)
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})        
    }
})

/**
 * POST a new student to the database.
 */
app.post('/students', async (req, res) => {
    try{
        if (Object.keys(req.body).length===0) {
            res.status(400).json({message: "body is missing"})
        }
        else{
            
            const student = new Student(req.body)
            await student.save()
            res.status(201).json({ student })
        }
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
    }
})


/**
 * GET a specific student from the database based on its email and password and return its teamName.
 */
app.get('/student/:email', async (req, res) => {
  try {
    // Find the student in the database
    const student = await Student.findOne({where: { email: req.params.email }});
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    // Return the student's teamName attribute
    if (student.team) {
      res.json({ teamName: student.team });
    } else {
        return res.status(404).json({ message: 'team not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * GET all the teams from the database.
 */
app.get('/teams', async (req, res, next) => {
    try {
      const teams = await Team.findAll()
      res.status(200).json(teams)
    } catch (err) {
      next(err)
    }
  })

/**
 * GET a specific team from the database based on its name.
 */
app.get('/teams/:name', async (req, res) => {
    try {
      const team = await Team.findOne({
        where: {
          name: req.params.name
        }
      });
      if (!team) {
        res.status(404).send({ message: 'Team not found' });
      } else {
        res.status(200).send(team);
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

module.exports = app
