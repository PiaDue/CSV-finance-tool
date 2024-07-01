import { useFile } from '../contexts/FileContext';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GBCategorySection() {
    const { getBackKeywords, changeGetBackKeywords } = useFile();
    const [keywords, setKeywords] = useState(getBackKeywords.join(","));
    const [newKeywords, setNewKeywords] = useState(getBackKeywords);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleKeywordsChange = (e) => {
        setNewKeywords(e.target.value.split(","));
    };

    const handleSave = () => {
        setKeywords(newKeywords.join(","));
        changeGetBackKeywords(newKeywords);
        handleCloseModal();
    };



    return (
        <>
            <span>
                <Button variant="light" size="sm" className="m-1" onClick={handleShowModal}>
                    <strong>
                        <i className="bi bi-key bottom-0 end-0 m-1"></i>
                        Keywords:
                    </strong>
                </Button>
                {keywords}
            </span>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-warning'>GetBack Keywords</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Keywords ( ,-getrennt )</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newKeywords.join(",")}
                            onChange={handleKeywordsChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default GBCategorySection;