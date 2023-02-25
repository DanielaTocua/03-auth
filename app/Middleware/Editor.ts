import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Editor {
  public async handle({ auth}: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user
    console.log(user)
    if (user?.profile_id == 3){
      throw new AuthenticationException("El usuario no tiene los permisos requeridos", "E_UNAUTHORIZED_ACCESS")
    }
    await next()
  }
}
