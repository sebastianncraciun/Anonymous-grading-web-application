const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my.db',
    define: {
        timestamps: false
    }
})

let FoodItem = sequelize.define('foodItem', {
    name : Sequelize.STRING,
    category : {
        type: Sequelize.STRING,
        validate: {
            len: [3, 10]
        },
        allowNull: false
    },
    calories : Sequelize.INTEGER
})
 
let Student = sequelize.define('student', {
    name : {
    type: DataTypes.STRING,
    allowNull: false
    },
    email : Sequelize.STRING,
    password : Sequelize.STRING,
    team : Sequelize.STRING
})

let Team = sequelize.define('team',{
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    linkProject: Sequelize.STRING
})

const app = express()
app.use(express.json())
// TODO

app.get('/create', async (req, res, next) => {
    try {
      await sequelize.sync({ force: true })
      res.status(201).json({ message: 'Database created with the models.' })
    } catch (err) {
      next(err)
    }
  })

app.get('/food-items', async (req, res) => {
    try{
        let foodItems = await FoodItem.findAll()
        res.status(200).json(foodItems)
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})        
    }
})

app.post('/food-items', async (req, res) => {
    try{
        if (Object.keys(req.body).length===0) {
            res.status(400).json({message: "body is missing"})
        }
        else{
            if (req.body.name==null || req.body.category==null || req.body.calories==null)
            {res.status(400).json({message : 'malformed request'})
            }
                else if (req.body.calories <= 0) {
                    res.status(400).json({message: "calories should be a positive number"})
                }
                else if(req.body.category!="VEGETABLE" && req.body.category!="DAIRY" && req.body.category!="MEAT")
                        {res.status(400).json({message: "not a valid category"})}
                            else{
                                const foodItem=new FoodItem(req.body)
                                await foodItem.save();
                                res.status(201).json({ message: 'created' })
                                }
            
        }  
    }    
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
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
  router.get('/teams/:name', async (req, res) => {
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