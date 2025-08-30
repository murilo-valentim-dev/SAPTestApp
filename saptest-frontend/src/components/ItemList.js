import React, { useEffect, useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { api } from "../api/api";
import ItemForm from "./ItemForm";

export default function ItemList() {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    const fetchItems = async () => {
        try {
            const response = await api.get("/Items");
            setItems(response.data);
        } catch (error) {
            console.error("Erro ao buscar itens", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este item?")) return;
        try {
            await api.delete(`/Items/${id}`);
            fetchItems();
        } catch (error) {
            console.error("Erro ao excluir item", error);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
    };

    const handleFormClose = () => {
        setEditingItem(null);
        fetchItems();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Itens</h2>

            {/* Formulário de edição só aparece quando clicam em Editar */}
            {editingItem && (
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h5 className="card-title">Editar Item</h5>
                        <ItemForm item={editingItem} onClose={handleFormClose} />
                    </Card.Body>
                </Card>
            )}

            {/* Tabela */}
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Nenhum item cadastrado
                            </td>
                        </tr>
                    )}
                    {items.map((item) => (
                        <tr key={item.itemCode}>
                            <td>{item.itemCode}</td>
                            <td>{item.itemName}</td>
                            <td>{item.quantity}</td>
                            <td className="text-center">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(item)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(item.itemCode)}
                                >
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
