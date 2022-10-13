import "./Modal.css";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ closeModal, children }: ModalProps) {
  return (
    <div className="modal-container">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal">{children}</div>
    </div>
  );
}
