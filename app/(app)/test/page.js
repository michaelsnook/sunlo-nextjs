import ShowUser from './ShowUser'

export default function Page() {
  return (
    <div>
      <p>
        this is a test page, with some things generated on the server (like this
        part) and other things generated on the client.
      </p>
      <ShowUser />
    </div>
  )
}
