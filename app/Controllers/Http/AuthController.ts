import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class AuthController {
    public async registerUser({request, auth,response}:HttpContextContract){
        const {name,surname,type_id,id,address,municipality,department,email,password, profile_id} = request.all();
        const userExists = await User.find(id)
        if (userExists != null){
            return response.status(400).json({"msg":"Esta identificación ya está registrada"})
        }
        const user = new User();
        user.id = id;
        user.name = name;
        user.surname = surname;
        user.type_id = type_id;
        user.address = address;
        user.municipality = municipality;
        user.department = department;
        user.email = email;
        user.password = password;
        user.profile_id = profile_id;
        await user.save()

        const token = await auth.use("api").login(user,{
            expiresIn:"10 days"
        })
        return {
            token,
            "msg": "Usuario registrado correctamente"
        }
    }

    public async login({auth,request,response}:HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        try{
            const token = await auth.use("api").attempt(email,password,{
                expiresIn:"60 mins"
            });
            return {
                token,
                "msg": "Usuario logueado correctamente"
            }
        } catch (error){
            return response.unauthorized('Invalid credentials')
        }
    }
}
