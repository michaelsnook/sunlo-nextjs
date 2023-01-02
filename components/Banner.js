const Banner = ({ children }) => (
  <div className="md:min-h-60vh text-white bg-primary pt-10 md:pt-16 pb-16 md:pb-24 grid">
    <div className="container place-self-center">{children}</div>
  </div>
)

export default Banner
