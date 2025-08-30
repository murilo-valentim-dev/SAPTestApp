import React, { useEffect, useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { api } from '../api/api';
import PartnerForm from './PartnerForm';

export default function PartnerList() {
    const [partners, setPartners] = useState([]);
    const [editingPartner, setEditingPartner] = useState(null);

    const fetchPartners = async () => {
        try {
            const response = await api.get('/Partners');
            setPartners(response.data);
        } catch (err) {
            console.error('Erro ao buscar parceiros', err);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleDelete = async (cardCode) => {
        if (!window.confirm('Tem certeza que deseja excluir este parceiro?')) return;
        try {
            await api.delete(`/Partners/${cardCode}`);
            fetchPartners();
        } catch (err) {
            console.error('Erro ao excluir parceiro', err);
        }
    };

    const handleEdit = (partner) => {
        setEditingPartner(partner);
    };

    const handleFormClose = () => {
        setEditingPartner(null);
        fetchPartners();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Parceiros</h2>

            {/* Formulário de edição só aparece quando clicam em Editar */}
            {editingPartner && (
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h5 className="card-title">Editar Parceiro</h5>
                        <PartnerForm
                            partner={editingPartner}
                            onClose={handleFormClose}
                        />
                    </Card.Body>
                </Card>
            )}

            {/* Tabela */}
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>CardCode</th>
                        <th>CardName</th>
                        <th>CardType</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Nenhum parceiro cadastrado
                            </td>
                        </tr>
                    )}
                    {partners.map((partner) => (
                        <tr key={partner.cardCode}>
                            <td>{partner.cardCode}</td>
                            <td>{partner.cardName}</td>
                            <td>{partner.cardType}</td>
                            <td className="text-center">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(partner)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(partner.cardCode)}
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
