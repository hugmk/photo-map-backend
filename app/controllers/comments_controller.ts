import Comment from '#models/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  async store({ request, params, auth, response }: HttpContext) {
    await auth.use('api').authenticate()

    const { content } = request.only(['content'])
    const photoId = params.id

    const comment = await Comment.create({
      userId: auth.user!.id,
      photoId,
      content,
    })

    return response.created(comment)
  }

  async index({ params, response }: HttpContext) {
    const photoId = params.id

    const comments = await Comment.query()
      .where('photo_id', photoId)
      .preload('user')
      .orderBy('created_at', 'asc')

    return response.ok(comments)
  }
}
