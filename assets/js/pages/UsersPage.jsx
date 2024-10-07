import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { applyPagination } from "../components/Pagination";
import { UsersSearch } from "../components/Users/Users-search";
import { UsersTable } from "../components/Users/Users-table";
import { useSelection } from "../components/hooks/use-selection";
import usersAPI from "../services/usersAPI";
import UserForm from "./UserForm";

const now = new Date();

const UsersPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ModalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [filter, setFilter] = useState(null);

  const handleDelete = async (selectedItems) => {
    try {
      usersAPI.deleteUsers(selectedItems);

      fetchUser();

      usersSelection.handleDeselectAll();
    } catch (error) {
      console.error("Error deleting Utilisateur:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const users = await usersAPI.findAll();
      setUser(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [!isModalOpen, !ModalUpdateOpen]);

  const paginatedUsers = useMemo(() => {
    return applyPagination(user, page, rowsPerPage);
  }, [user, page, rowsPerPage]);

  const usersIds = useMemo(() => {
    return user.map((userData) => userData.id);
  }, [user]);

  const usersSelection = useSelection(usersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setModalUpdateOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedUser(null);
    setModalUpdateOpen(false);
  };

  const handleShowAdminUsers = () => {
    setFilteredUsers(
      user.filter((userData) => userData.role.name === "ROLE_ADMIN")
    );
    setFilter("admins");
  };

  const handleShowUsers = () => {
    setFilteredUsers(
      user.filter((userData) => userData.role.name === "ROLE_USER")
    );
    setFilter("users");
  };

  const handleResetDisplay = () => {
    setFilteredUsers(user);
    setFilter(null);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h4">Utilisateurs</Typography>
              </Stack>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleOpenModal()}
              >
                Créer Utilisateur
              </Button>
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant={filter === null ? "contained" : "outlined"}
                onClick={handleResetDisplay}
                style={{ marginRight: "10px" }}
              >
                Default
              </Button>
              <Button
                variant={filter === "admins" ? "contained" : "outlined"}
                onClick={handleShowAdminUsers}
                style={{ marginRight: "10px" }}
              >
                Admins
              </Button>
              <Button
                variant={filter === "users" ? "contained" : "outlined"}
                onClick={handleShowUsers}
              >
                Users
              </Button>
            </div>
            <UsersSearch />
            <UsersTable
              count={filteredUsers.length}
              items={filteredUsers}
              onDeselectAll={usersSelection.handleDeselectAll}
              onDeselectOne={usersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={usersSelection.handleSelectAll}
              onSelectOne={usersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={usersSelection.selected}
              onDelete={handleDelete}
              selectedUser={selectedUser}
              ModalUpdateOpen={ModalUpdateOpen}
              onOpenUpdateModal={handleOpenUpdateModal}
              onCloseUpdateModal={handleCloseUpdateModal}
            />
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="ticket-modal"
              aria-describedby="ticket-details"
            >
              <Box style={{ marginTop: "200px" }}>
                <UserForm onClose={handleCloseModal} />
              </Box>
            </Modal>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default UsersPage;
