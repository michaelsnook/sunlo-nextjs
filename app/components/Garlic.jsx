import Image from 'next/image'

export const Garlic = ({ size = 50, className = '' }) => (
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

export const GarlicBroccoli = ({ size = 50, className = '' }) => (
  <Image
    src="/images/logo-pair.png"
    alt="a smiling garlic"
    width={size}
    height={size / 1.5878}
    style={{
      filter: 'drop-shadow(0px 5px 15px #fff)',
    }}
    className={`place-self-center ${className}`}
  />
)
