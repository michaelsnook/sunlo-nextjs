import { useMutation } from '@tanstack/react-query'
import supabase from 'lib/supabase-client'
import ErrorList from 'app/components/ErrorList'
import { toast } from 'react-toastify'

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

  console.log(`the url`, url)
  return (
    <div className="relative border min-h-40 flex-shrink">
      <label
        htmlFor="avatarUploadInput"
        className="z-10 relative border border-dashed rounded text-center flex flex-col fit-content h-full"
      >
        {url && <img src={url} alt="Avatar" className="avatar image" />}
        <input
          className="z-90 absolute opacity-0 top-0 left-0 right-0 bottom-0"
          type="file"
          id="avatarUploadInput"
          name="files[]"
          accept="image/*"
          onChange={sendImage.mutate}
          disabled={sendImage.isSubmitting}
        />
        <div className="absolute opacity-0 hover:opacity-100 top-0 left-0 right-0 bottom-0 fit-content flex flex-col justify-center h-full bg-white/30">
          <h3>Drag&amp;Drop files here</h3>
          <span className="text-sm">or</span>
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
