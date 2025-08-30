import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { api } from "../api/api";

export default function ItemForm({ item, onClose }) {
    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (item) {
            setItemCode(item.itemCode);
            setItemName(item.itemName);
            setQuantity(item.quantity);
        } else {
            setItemCode("");
            setItemName("");
            setQuantity(0);
        }
    }, [item]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (item) {
                await api.put(`/Items/${itemCode}`, { itemCode, itemName, quantity });
            } else {
                await api.post("/Items", { itemCode, itemName, quantity });
            }
            onClose();
        } catch (error) {
            console.error("Erro ao salvar item", error);
            alert("Erro ao salvar item. Veja o console para detalhes.");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Item Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemCode}
                            onChange={(e) => setItemCode(e.target.value)}
                            required
                            disabled={!!item}
                        />
                    </Form.Group>
                </Col>
                <Col md={5}>
                    <Form.Group>
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div>
                <Button variant="primary" type="submit" className="me-2">
                    {item ? "Atualizar" : "Cadastrar"}
                </Button>
                {item && (
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Form>
    );
}
