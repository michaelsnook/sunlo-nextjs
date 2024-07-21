import { cn } from 'lib/utils'

const Loading = ({ className }) => (
  <div className={cn('w-full flex justify-center my-10', className)}>
    <progress className="progress w-56"></progress>
  </div>
)

export default Loading
