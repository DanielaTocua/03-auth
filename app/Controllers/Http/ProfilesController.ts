import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from "App/Models/Profile";
export default class ProfilesController {

    public async registerProfile({request}:HttpContextContract){
        const profile = new Profile();
        profile.description= request.input('description');
        await profile.save()
        return {
            "Profile": profile,
            "msg": "Registro ingresado correctamente",
            "status": 200
        }
    }

    public async listAll() {
        const profiles = await Profile.all()
        return profiles
    }

    public async find({params,response}:HttpContextContract){
        try{
            const profile = await Profile.find(params.id)
            if (profile){
                return profile
            } else {
                return ("Registro no existe")
            }
        } catch (error) {
            console.log(error)
            return response.status(400).json({"msg": "Error al buscar el perfil"})
        }
    }

    public async update({request,params,response}:HttpContextContract) {
        const profile = await Profile.find(params.id);
        
        if (profile) {
            profile.description = request.input('description')
            if (await profile.save()) {
                return {
                    "msg": "Actualizado correctamente",
                    profile
                }
            }
            return response.status(400).json({"msg":"Error al actualizar"})
            
        } 
        return response.status(400).json({"msg": "Registro no encontrado"})
    }

    public async delete({params,response}:HttpContextContract){
        const id = params.id
        console.log(id)
        try {
            await (await Profile.findOrFail(id)).delete()
            return {"msg": "Eliminado correctamente", "status": 200}
        } catch(err) {
            return response.status(400).json({"msg": "Error al eliminar el registro"})
        }
     }

}
