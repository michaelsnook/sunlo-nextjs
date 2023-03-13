import Image from 'next/image'

const Garlic = ({ size = 50 }) => (
  <Image
    src="/images/garlic.png"
    alt="a smiling garlic"
    width={size}
    height={size}
  />
)

export default Garlic
