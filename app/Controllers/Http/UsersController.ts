import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class UsersController {
    public async listAll() {
        const users = await User.all()
        return users
    }

    public async find({params,response}:HttpContextContract){
        try{
            const user = await User.find(params.id)
            if (user){
                return user
            } else {
                return ("Registro no existe")
            }
        } catch (error) {
            console.log(error)
            return response.status(400).json({"msg": "Error al buscar el libro"})
        }
    }

    public async update({request,params,response}:HttpContextContract) {
        const user = await User.find(params.id);
        
        if (user) {
            const {name,surname,type_id, address, municipality, department,email,profile_id} = request.all()
            user.name = name
            user.surname = surname
            user.type_id = type_id
            user.address = address
            user.municipality = municipality
            user.department = department
            user.email = email
            user.profile_id = profile_id
            if (await user.save()) {
                return {
                    "msg": "Actualizado correctamente",
                    user
                }
            }
            return response.status(400).json({"msg":"Error al actualizar"})
            
        } 
        return response.status(400).json({"msg": "Registro no encontrado"})
    }

    public async delete({params, response}:HttpContextContract){
        const id = params.id;
        try {
            await (await User.findOrFail(id)).delete()
            return {"msg": "Eliminado correctamente", "status": 200}
        } catch(err) {
            return response.status(400).json({"msg": "Error al eliminar el registro"})
        }
     }
}
