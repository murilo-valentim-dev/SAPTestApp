import React from 'react';
import { Card } from 'react-bootstrap';
import PartnerForm from '../components/PartnerForm';
import PartnerList from '../components/PartnerList';

export default function PartnersPage() {
    return (
        <>
            <Card className="p-3 mb-4">
                <Card.Title>Cadastrar Parceiro</Card.Title>
                <PartnerForm />
            </Card>
            <Card className="p-3">
                <Card.Title>Lista de Parceiros</Card.Title>
                <PartnerList />
            </Card>
        </>
    );
}
