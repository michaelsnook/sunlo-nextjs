import Modal from 'react-modal'

Modal.setAppElement('#modal-root')

function MyModal({ onRequestClose, isOpen, children }) {
  return (
    <Modal
      isOpen={isOpen}
      className="big-card my-6 mx-auto w-11/12 place-self-center outline-none"
      overlayClassName="bg-black/60 fixed backdrop-blur-sm absolute inset-0 flex"
      noScroll={true}
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  )
}

export default MyModal
