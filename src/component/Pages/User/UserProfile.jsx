import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import AppBars from './AppBars';
import EditForm from './EditForm';
import UserForm from './UserForm';
import UserList from './UserList';

function UserProfile() {

  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => setOpen(id);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBars />
      <UserForm filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
      
      <Box sx={{ m: 2 }}>
        <EditForm open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
        <Grid container spacing={1} style={{display: "flex"}}>
          <UserList handleOpen ={handleOpen} filter={filter} search={search} setSearch={setSearch} />
        </Grid>
      </Box>
    </>
  );
}

export default UserProfile;
