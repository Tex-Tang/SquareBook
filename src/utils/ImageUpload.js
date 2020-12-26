import pica from 'pica'
import { storage } from '../api/firebase'

export default class ImageUpload {

  croppedSize =  [
    400, 1200
  ]

  /**
   * Crop image to specificed aspect ratio
   * 
   * @param {Image} inputImage 
   * @param {Number} outputImageAspectRatio
   * 
   * @return {Canvas} outputImage 
   */
  crop = (inputImage, outputImageAspectRatio = 1) => {
    const inputWidth = inputImage.naturalWidth;
    const inputHeight = inputImage.naturalHeight;
    const inputImageAspectRatio = inputWidth / inputHeight;
    let outputWidth = inputWidth;
    let outputHeight = inputHeight;
    if (inputImageAspectRatio > outputImageAspectRatio) {
      outputWidth = inputHeight * outputImageAspectRatio;
    } else if (inputImageAspectRatio < outputImageAspectRatio) {
      outputHeight = inputWidth / outputImageAspectRatio;
    }
    const outputX = (outputWidth - inputWidth) * .5;
    const outputY = (outputHeight - inputHeight) * .5;
    const outputImage = document.createElement('canvas');
    outputImage.width = outputWidth;
    outputImage.height = outputHeight;
    const ctx = outputImage.getContext('2d');
    ctx.drawImage(inputImage, outputX, outputY);
    return outputImage
  }

  /**
   * resize image to specific width and height by preserving aspect ratio
   * 
   * @param {File} file 
   * @param {Number} width 
   * @param {Number} height
   * 
   * @return {Promise} Blob 
   */
  resize = (file, width, height) => {
    let image = new Image()
    image.src = window.URL.createObjectURL(file)
    return new Promise((resolve, reject) => {
      image.onload = () => {
        let dest = document.createElement("canvas")
        dest.width = width
        dest.height = height
        pica().resize(this.crop(image, width/height), dest, {
          unsharpAmount: 80,
          unsharpRadius: 0.6
        }).then(result => {
          resolve(pica().toBlob(result, file.type, 0.60))
        })
      }
    })
  }

  /**
   * Upload to firebase storage
   * 
   * @param {File} file 
   * @param {String} path
   * 
   * @return response object 
   */
  upload = async (file, dir) => {
    try {
      const result = {}
      const fileType = file.type.split('/')[1]
      for (let size of this.croppedSize) {
        const filepath = `${dir}/${Date.now()}-${size}x${size}.${fileType}`;
        const image = await this.resize(file, size, size)
        await storage.ref(filepath)
        .put(image, {
          contentType: file.type
        })
        result[size] = filepath;
      }
      return { success: true, data: result }
    } catch (error) {
      return { success: false, message: error}
    }
  }

  /**
   * Delete a file by following ref path
   * 
   * @param {Object} images
   * @return response object 
   */
   delete = async (images) => {
    try {
      for (let size of this.croppedSize) {
        await storage.ref(images[size]).delete()
      }
      return { success: true, data: "Image deleted." }
    } catch (error) {
      return { success: false, message: "Image delete error!"}
    }
  }

  /**
   * Get image public url
   * 
   * @param {*} images 
   */
  getPublicUrl = async (images) => {
    for (let image of images) {
      for (let size of this.croppedSize) {
        image[size] = await storage.ref(image[size]).getDownloadURL()
      }
    }
    return images
  }

  getFullPath = (images) => {
    for (let image of images) {
      for (let size of this.croppedSize) {
        image[size] = storage.refFromURL(image[size]).fullPath
      }
    }
    return images
  }
}



