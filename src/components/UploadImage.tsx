'use client'
import { UploadButton } from '@/utils/uploadthing'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomButton from './common/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'

interface UploadResponse {
  url: string
  name: string
  key: string
}

interface UploadImageProps {
  setImageUrl: (url: string) => void
  initialImageUrl?: string // New prop for initial image URL
}

export default function UploadImage({
  setImageUrl, 
  initialImageUrl,
}: UploadImageProps) {
  const [imageUrl, setImageUrlState] = useState<string | null>(initialImageUrl || null)
  const [manualUrl, setManualUrl] = useState<string>(initialImageUrl || '')
  const [imageLoading, setImageLoading] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)
  const [showImage, setShowImage] = useState<boolean>(Boolean(initialImageUrl))
  const [showChangeButton, setShowChangeButton] = useState<boolean>(Boolean(initialImageUrl))

  useEffect(() => {
    if (imageUrl) {
      setImageUrl(imageUrl)
    }
  }, [imageUrl])

  const handleImageLoad = () => {
    setImageLoading(false)
    setShowImage(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const deleteImage = async (fileUrl: string) => {
    try {
      const response = await fetch('/api/uploadthing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fileUrl }),
      })

      if (!response.ok) {
        setImageError(true)
        const errorData = await response.json()
        console.error(
          'Failed to delete image:',
          errorData.error || 'Unknown error'
        )
        throw new Error(errorData.error || 'Failed to delete image')
      }

      console.log('Image deleted successfully')
      setShowChangeButton(false)
      setShowImage(false)
      setImageLoading(true)
      setImageUrlState(null)
      setImageUrl('')
      setManualUrl('') // Clear the input field when the image is deleted
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const handlePreview = () => {
    setImageUrlState(manualUrl)
    setShowImage(true)
    setImageError(false)
    setImageLoading(false)
  }

  return (
    <div className="flex flex-col space-y-6">

      {/* Input for manual URL */}
      <div className="flex space-x-4 items-center">
        <p className="subtitle3 w-[100px]">Image:</p>
        <input
          type="text"
          placeholder="Enter Image URL Manually"
          value={manualUrl}
          onChange={(e) => setManualUrl(e.target.value)}
          className="border border-neutral-600 p-2 rounded w-full"
        />
        <CustomButton color='secondary' className='w-[200px]' onClick={handlePreview}>
          Show Preview
        </CustomButton>
      </div>


      {imageError && (
        <p className="text-error-default ml-2">
          Error: image cannot be loaded.
        </p>
      )}

      {showImage ? (
        <div className="relative w-full h-[400px]">
          {imageLoading ? (
            <div className="flex flex-col space-y-4 justify-center items-center border-4 border-neutral-300 rounded-xl w-full h-[400px]">
              <p>Loading...</p>
            </div>
          ) : (
            <Image
              alt="Uploaded Image"
              src={imageUrl || ''}
              layout="fill"
              objectFit="cover"
              className={`rounded-xl transition duration-500 ease-out ${imageLoading ? 'blur-md' : 'blur-0'}`}
              onError={handleImageError}
              onLoadingComplete={handleImageLoad}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-4 justify-center items-center border-4 border-neutral-300 rounded-xl w-full h-[400px]">
          <div className="flex space-x-8">
            <FontAwesomeIcon
              icon={faImage}
              className="text-neutral-300 h-[80px]"
            />
            <FontAwesomeIcon icon={faPlus} className="text-neutral-300 h-[80px]" />
          </div>

          <UploadButton
            className="mt-2 ut-button:bg-primary-300 ut-button:text-white
                ut-button:ut-ready:bg-primary-500 ut-button:ut-ready:hover:bg-primary-600
                ut-button:ut-uploading:bg-primary-500"
            endpoint="imageUploader"
            onClientUploadComplete={(res: UploadResponse[]) => {
              console.log('Files: ', res)
              const uploadedUrl = res[0].url
              setImageUrlState(uploadedUrl)
              setManualUrl(uploadedUrl) // Update the input field with the uploaded image URL
              setShowImage(true)
              setImageLoading(false)
              setShowChangeButton(true)
            }}
            onUploadError={(error: Error) => {
              setImageError(true)
              alert(`ERROR! ${error.message}`)
            }}
          />
        </div>
      )}

      {showChangeButton && (
        <CustomButton color='secondary' onClick={() => deleteImage(imageUrl || '')}>
          Change Image
        </CustomButton>
      )}
    </div>
  )
}
