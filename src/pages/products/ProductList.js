import React from 'react';
// material
import { Card, Container, TableContainer, Typography } from '@material-ui/core';
// custom components
import { Page, TableX } from '../../components';

// ----------------------------------------------------------------------

const cellSchema = [
  {
    columnName: 'name',
    columnLabel: 'Producto',
    render: (data) => <Typography>{data}</Typography>
  },
  {
    columnName: 'createdAt',
    columnLabel: 'Fecha de creación',
    columnProps: { align: 'center' },
    cellProps: { align: 'center' },
    render: (data) => <Typography>{data}</Typography>
  },
  {
    columnName: 'status',
    columnLabel: 'Estado',
    columnProps: { align: 'center' },
    cellProps: { align: 'center' },
    render: (data) => <Typography sx={{ color: 'green' }}>{data}</Typography>
  },
  {
    columnName: 'price',
    columnLabel: 'Precio',
    columnProps: { align: 'right' },
    cellProps: { align: 'right' },
    render: (data) => <Typography>{data}</Typography>
  }
];

const products = [
  {
    name: 'arroz',
    createdAt: '00/00/0000',
    status: 'En stock',
    price: '$1000'
  },
  {
    name: 'azucar',
    createdAt: '00/00/0000',
    status: 'En stock',
    price: '$1500'
  },
  {
    name: 'café',
    createdAt: '00/00/0000',
    status: 'En stock',
    price: '$1200'
  }
];

// ----------------------------------------------------------------------

const ProductList = () => (
  <Page>
    <Container>
      <Card sx={{ paddingTop: 1 }}>
        <TableContainer>
          <TableX dataSource={products} cellSchema={cellSchema} />
        </TableContainer>
      </Card>
    </Container>
  </Page>
);

export default ProductList;
