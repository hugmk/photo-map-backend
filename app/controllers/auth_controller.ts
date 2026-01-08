import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'username', 'password'])

    if (!data.email || !data.username || !data.password) {
      return response.badRequest({
        message: 'Email, name and password are required',
      })
    }

    try {
      const user = await User.create(data)
      const token = await User.accessTokens.create(user)
      return response.created({
        user,
        token: token.value!.release(),
      })
    } catch (error) {
      return response.badRequest({
        message: 'Email or username already exists',
      })
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    if (!email || !password) {
      return response.badRequest({
        message: 'Email and password are required',
      })
    }

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return response.ok({
        user,
        token: token.value!.release(),
      })
    } catch {
      return response.unauthorized({
        message: 'Invalid credentials',
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    const token = auth.user!.currentAccessToken!

    await User.accessTokens.delete(user, token.identifier)

    return response.ok({
      message: 'Logged out successfully',
    })
  }
}
