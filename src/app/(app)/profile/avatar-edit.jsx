import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import ErrorList from 'components/error-list'
import { toast } from 'react-hot-toast'

const avatarFullUrl = fullPath =>
  `https://hepudeougzlgnuqvybrj.supabase.co/storage/v1/object/public/${fullPath}`

const filenameFromFile = file => {
  // returns a string like pic-of-my-cat-1a4d06.jpg

  // separate the file extension so we can re-append it at the end 'jpg'
  let nameparts = file.name.split('.')
  const ext = nameparts.pop()

  // rejoin the remaining parts in case of 'pic.of.my.cat.jpg'
  const slug = nameparts.join('.')

  // a hash like '1a4d06' from the image timestamp to track uniqueness
  const timeHash = Math.round(file.lastModified * 0.000001).toString(16)

  const path = `${slug}-${timeHash}.${ext}`
  return path
}

export default function AvatarEditor({ url, onUpload }) {
  const sendImage = useMutation({
    mutationFn: async event => {
      event.preventDefault()
      console.log(`sendImage.mutate`, event)
      if (!event.target.files || event.target.files.length === 0)
        throw "There's no file to submit"
      const file = event.target.files[0]
      const filename = filenameFromFile(file)
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${filename}`, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (error) throw error
      onUpload(avatarFullUrl(data?.fullPath))
      return data
    },
    onSuccess: data => {
      console.log(`onSuccess for uploading avatar`, data)
      toast.success(`Avatar uploaded...`)
    },
  })

  return (
    <div className="relative h-40 flex-shrink border border-dashed p-2">
      <label
        htmlFor="avatarUploadInput"
        className="fit-content relative z-10 flex h-full flex-col rounded text-center"
      >
        {url && (
          <span className="mask mask-circle mx-auto grid h-36 w-36 place-content-center">
            <Image
              src={url}
              width="144"
              height="144"
              alt={`Your profile image`}
            />
          </span>
        )}
        <input
          className="z-90 absolute bottom-0 left-0 right-0 top-0 opacity-0"
          type="file"
          id="avatarUploadInput"
          name="files[]"
          accept="image/*"
          onChange={sendImage.mutate}
          disabled={sendImage.isSubmitting}
        />
        <div className="fit-content absolute bottom-0 left-0 right-0 top-0 flex h-full flex-col justify-center bg-base-100/50 opacity-0 backdrop-blur hover:opacity-100">
          <h3 className="text-base-content">drag &amp; drop image or</h3>
          <a className="btn btn-primary mx-auto">
            {sendImage.isSubmitting ? 'Uploading ...' : 'Browse Files'}
          </a>
        </div>
      </label>
      {sendImage?.error && (
        <ErrorList
          summary="Error uploading image"
          error={sendImage?.error.message}
        />
      )}
    </div>
  )
}
