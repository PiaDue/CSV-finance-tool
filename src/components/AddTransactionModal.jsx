import React, { useState } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useFile } from '../contexts/FileContext';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AddTransactionModalStyles.scss';

function AddTransactionModal() {
    const [show, setShow] = useState(false);
    const { addTransaction } = useFile();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        date: new Date(),
        zahlungspflichtige: '',
        zahlungsempfanger: '',
        verwendungszweck: '',
        betrag: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date: date
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction(formData);

        setFormData({
            date: new Date(),
            verwendungszweck: '',
            betrag: '',
            category: ''
        });
        handleClose();
    };

    return (
        <>
            <Button variant="light" size="sm" className="m-1" onClick={handleShow}>
                <i className="bi bi-plus h6"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Neue Transaktion</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formDate">
                            <Form.Label column sm="4">Datum</Form.Label>
                            <Col sm="8">
                                <DatePicker
                                    selected={formData.date}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formVerwendungszweck">
                            <Form.Label column sm="4">Verwenungszweck</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="text"
                                    name="verwendungszweck"
                                    value={formData.verwendungszweck}
                                    onChange={handleChange}
                                    placeholder="Verwenungszweck"
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBetrag">
                            <Form.Label column sm="4">Betrag (€)</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    name="betrag"
                                    value={formData.betrag}
                                    onChange={handleChange}
                                    placeholder="Betrag (€)"
                                    step="0.01"
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formCategory">
                            <Form.Label column sm="4">Category</Form.Label>
                            <Col sm="8">
                                <Form.Check
                                    type="radio"
                                    label="YouPay"
                                    name="category"
                                    value="YouPay"
                                    checked={formData.category === 'YouPay'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="GetBack"
                                    name="category"
                                    value="GetBack"
                                    checked={formData.category === 'GetBack'}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Income"
                                    name="category"
                                    value="Income"
                                    checked={formData.category === 'Income'}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">Hinzufügen</Button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddTransactionModal;