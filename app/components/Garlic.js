import Image from 'next/image'

const Garlic = ({ size = 50, className = '' }) => (
  <Image
    src="/images/garlic.png"
    alt="a smiling garlic"
    width={size}
    height={size}
    style={{
      filter: 'drop-shadow(0px 0px 2px #fff)',
    }}
    className={`place-self-center ${className}`}
  />
)

export default Garlic
