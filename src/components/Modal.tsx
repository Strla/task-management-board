import {ReactNode} from 'react';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white p-6 rounded shadow-lg relative w-[500px]" onClick={(e) => e.stopPropagation()}>
                <Button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    &times;
                </Button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
