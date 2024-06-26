import Modal from 'react-modal'

Modal.setAppElement('#modal-root')

function MyModal({ onRequestClose, isOpen, children }) {
  return (
    <Modal
      isOpen={isOpen}
      className="@container card-white w-app my-6 place-self-center outline-none max-sm:mx-1"
      overlayClassName="bg-black/60 fixed backdrop-blur-sm fixed inset-0 flex"
      noScroll={true}
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  )
}

export default MyModal
