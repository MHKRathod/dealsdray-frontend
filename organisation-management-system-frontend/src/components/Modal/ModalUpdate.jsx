import React from 'react';
import Modal from 'react-modal';
import './ModalComponent.css';
import customModalStyles from './customModalStyles';

const ModalComponent = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customModalStyles}
            contentLabel="Employee Updated Modal"
        >
            <h2>Employee Updated!</h2>
            <button onClick={onRequestClose} className="modal-button">Close</button>
        </Modal>
    );
};

export default ModalComponent;
