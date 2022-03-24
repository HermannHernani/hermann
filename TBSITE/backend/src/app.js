import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'
import { Database } from "./database/index.js"
import 'dotenv/config'

class App{
    constructor(){
        this.server=express()
        this.server.use(cors({
        'origin': '*',
        'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',}));
        this.middlewares()
        this.routes()
        this.database = Database
    }
    middlewares(){ 
        this.server.use(express.json())
        this.server.use('/files',express.static(path.resolve(__dirname,'..','tmp','uploads')))
       
    }
    routes(){
        this.server.use(routes)
    }
}
export default new App().server