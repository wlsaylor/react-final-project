import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ( {confirmShow, onDelete, handleConfirmClose} ) => {    
    return (
        <Modal show={confirmShow} onHide={handleConfirmClose}>
            <Modal.Body>
                <p>Are you sure you want to delete this?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleConfirmClose}> Cancel </Button>
                <Button variant="danger" onClick={onDelete}>Confirm Delete</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ConfirmModal;
