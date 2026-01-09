import type { HttpContext } from '@adonisjs/core/http'
import Photo from '#models/photo'
import { cuid } from '@adonisjs/core/helpers'
import exifr from 'exifr'

export default class PhotosController {
  async store({ request, auth, response }: HttpContext) {
    const image = request.file('image', { size: '5mb', extnames: ['jpg', 'jpeg', 'png'] })

    if (!image) {
      return response.badRequest({ error: 'Image is required' })
    }

    // Temp path to image
    const tmpPath = image.tmpPath!
    const exifData = await exifr.gps(tmpPath)

    if (!exifData || !exifData.latitude || !exifData.longitude) {
      return response.badRequest({ error: 'No GPS data found in the image' })
    }

    const fileName = `${cuid()}.${image.extname}`
    await image.moveToDisk(`photos/${fileName}`, { disk: 'local' })

    const imageUrl = image.meta.url

    const photo = await Photo.create({
      userId: auth.user!.id,
      imageUrl,
      latitude: exifData.latitude,
      longitude: exifData.longitude,
    })

    return photo
  }

  async index({ response }: HttpContext) {
    const photos = await Photo.query().orderBy('created_at', 'desc')
    return response.ok(photos)
  }
}
