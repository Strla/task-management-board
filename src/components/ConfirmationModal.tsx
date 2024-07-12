import Modal from './Modal';
import Button from './Button';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationModal = ({isOpen, onClose, onConfirm, title, message}: ConfirmationModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-4" id="confirmation-modal-title">{title}</h2>
            <p className="mb-4">{message}</p>
            <div className="flex justify-end space-x-4">
                <Button onClick={onClose} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                    Cancel
                </Button>
                <Button onClick={onConfirm} className="bg-red-500 text-white hover:bg-red-600">
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
