import type { HttpContext } from '@adonisjs/core/http'
import Photo from '#models/photo'
import { cuid } from '@adonisjs/core/helpers'
import exifr from 'exifr'
import path from 'node:path'

export default class PhotosController {
  async store({ request, auth }: HttpContext) {
    const image = request.file('image', {
      size: '20mb',
      extnames: ['jpg', 'jpeg', 'png'],
    })

    if (!image) {
      return { error: 'Image is required' }
    }

    const fileName = `${cuid()}.${image.extname}`
    const filePath = `photos/${fileName}`

    await image.moveToDisk(filePath, {
      disk: 'local',
    })

    const diskPath = path.join('storage', image.fileName!)
    const exifData = await exifr.gps(diskPath)
    if (!exifData || !exifData.latitude || !exifData.longitude) {
      return { error: 'No GPS data found in the image' }
    }

    const latitude = exifData.latitude
    const longitude = exifData.longitude
    const imageUrl = image.meta.url

    const photo = await Photo.create({
      userId: auth.user!.id,
      imageUrl,
      latitude,
      longitude,
    })

    return photo
  }

  async index({ response }: HttpContext) {
    const photos = await Photo.query().orderBy('created_at', 'desc')
    return response.ok(photos)
  }
}
