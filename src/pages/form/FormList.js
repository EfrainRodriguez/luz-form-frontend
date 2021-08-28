import React, { useState, useEffect } from 'react';
// router
import { useHistory } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Button,
  Container,
  TableContainer,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormList, setFormData } from '../../store/slices/form';
// custom components
import { Page, TableX, ListToolbar } from '../../components';
import LoadingPage from '../LoadingPage';
// paths
import { PATH_FORM } from '../../routes/paths';
// constants
import { genders, states } from '../../constants';

const cellSchema = [
  {
    columnName: 'age',
    columnLabel: 'Idade',
    columnProps: { align: 'center' },
    cellProps: { align: 'center' },
    render: (data) => <Typography>{data}</Typography>
  },
  {
    columnName: 'gender',
    columnLabel: 'Gênero',
    columnProps: { align: 'center' },
    cellProps: { align: 'center' },
    render: (data) => <Typography>{genders[data]}</Typography>
  },
  {
    columnName: 'state',
    columnLabel: 'Estado',
    columnProps: { align: 'center' },
    cellProps: { align: 'center' },
    render: (data) => <Typography>{states[data]}</Typography>
  },
  {
    columnName: 'contact',
    columnLabel: 'Contato',
    columnProps: { align: 'center' },
    cellProps: { align: 'center' },
    render: (data) => <Typography>{data}</Typography>
  }
];

const FormList = () => {
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);

  const { formList, isLoading } = useSelector((state) => state.form);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleUserSelected = (userData) => {
    dispatch(setFormData(userData));
  };

  const handleEditUser = () => {
    history.push(PATH_FORM.userSectionOne);
  };

  const handleNewForm = () => history.push(PATH_FORM.userSectionOne);

  const handleChangeRowsPerPage = (rowsPerPage) => {};

  useEffect(() => {
    dispatch(fetchFormList());
  }, [dispatch]);

  return (
    <>
      <Page title="Lista de formulários">
        <Container>
          <Box mb={2} display="flex" justifyContent="flex-end">
            <Button
              type="primary"
              variant="contained"
              size="medium"
              onClick={handleNewForm}
            >
              Preencher um formulário
            </Button>
          </Box>
          <Card sx={{ paddingTop: 1 }}>
            {isLoading && <LoadingPage />}
            <ListToolbar
              numSelected={selected.length}
              filterName={filterName}
              searchPlaceholder="Buscar formulário..."
              actions={
                <>
                  {selected.length <= 1 && (
                    <Tooltip title="Editar">
                      <IconButton onClick={handleEditUser}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Excluir">
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </>
              }
              onFilterName={handleFilterByName}
            />
            <TableContainer>
              <TableX
                selected={selected}
                filterName={filterName}
                searchBy="state"
                dataSource={formList}
                cellSchema={cellSchema}
                onSelected={setSelected}
                onRowSelected={handleUserSelected}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default FormList;
