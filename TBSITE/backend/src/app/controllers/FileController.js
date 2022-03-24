import File from '../models/File'
class FileController{
    async store (req,res){
        const{originalname:name ,filename:path} = req.file
 
        const file= await File.create({
            name,
            path
        }) 
        return res.json(file)
    }
    async index(req,res){
        const{id,url,path}= await File.findOne({where:{
            id:req.params.id
        }})
        return res.json({
            id,
            url,
            path
        })
    }
}

export default new FileController()