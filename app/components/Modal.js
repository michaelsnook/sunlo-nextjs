import Modal from 'react-modal'

Modal.setAppElement('#modal-root')

function MyModal({ onRequestClose, isOpen, children }) {
  return (
    <Modal
      className="big-card my-6 mx-auto"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  )
}

export default MyModal
