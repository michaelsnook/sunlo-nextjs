import Modal from 'react-modal'

Modal.setAppElement('#modal-root')

function MyModal({ onRequestClose, isOpen, children }) {
  return (
    <Modal
      isOpen={isOpen}
      className="big-card my-6 mx-auto"
      noScroll={true}
      overlayClassName="bg-black/60 fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm absolute"
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  )
}

export default MyModal
