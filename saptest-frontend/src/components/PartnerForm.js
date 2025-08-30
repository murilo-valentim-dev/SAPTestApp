import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

export default function PartnerForm({ partner, onClose }) {
    const [cardCode, setCardCode] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardType, setCardType] = useState('C');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (partner) {
            setCardCode(partner.cardCode);
            setCardName(partner.cardName);
            setCardType(partner.cardType);
        } else {
            setCardCode('');
            setCardName('');
            setCardType('C');
        }
        setMessage('');
    }, [partner]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (partner) {
                // Atualiza parceiro
                await api.put(`/Partners/${cardCode}`, { cardCode, cardName, cardType });
                setMessage('Parceiro atualizado com sucesso!');
            } else {
                // Cria novo parceiro
                await api.post('/Partners', { cardCode, cardName, cardType });
                setMessage('Parceiro cadastrado com sucesso!');
                setCardCode('');
                setCardName('');
                setCardType('C');
            }
            if (onClose) onClose();
        } catch (err) {
            console.error(err);
            setMessage('Erro ao salvar parceiro.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {message && <Alert variant={partner ? "info" : "success"}>{message}</Alert>}
            <Row className="mb-2">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Card Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={cardCode}
                            onChange={e => setCardCode(e.target.value)}
                            required
                            disabled={!!partner}
                        />
                    </Form.Group>
                </Col>
                <Col md={5}>
                    <Form.Group>
                        <Form.Label>Card Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={cardName}
                            onChange={e => setCardName(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Card Type</Form.Label>
                        <Form.Select
                            value={cardType}
                            onChange={e => setCardType(e.target.value)}
                            required
                        >
                            <option value="C">Cliente</option>
                            <option value="F">Fornecedor</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <div>
                <Button variant="primary" type="submit" className="me-2">
                    {partner ? "Atualizar" : "Cadastrar"}
                </Button>
                {partner && (
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Form>
    );
}
