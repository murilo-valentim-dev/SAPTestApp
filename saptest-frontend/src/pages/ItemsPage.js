import React from 'react';
import { Card } from 'react-bootstrap';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

export default function ItemsPage() {
    return (
        <>
            <Card className="p-3 mb-4">
                <Card.Title>Cadastrar Item</Card.Title>
                <ItemForm />
            </Card>
            <Card className="p-3">
                <Card.Title>Lista de Itens</Card.Title>
                <ItemList />
            </Card>
        </>
    );
}
