const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const app = express()

const port = process.env.PORT || 3000


// Define path for express confi.
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))



app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Amit Kumar'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Amit Kumar'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText:'This is some help',
        title:'help',
        name:'Amit Kumar'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forcast(latitude,longitude,(error,forcastData) =>{
            if(error){
                return res.send({error})
            }
    
            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })
        })
    })

    

})

app.get('/product',(req,res) =>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Amit Kumar',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Amit Kumar',
        errorMessage:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})