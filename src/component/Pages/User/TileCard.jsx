import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Avatar,
  Button,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import { MdAccountCircle } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../../../Features/userSlice';

export default function TileCard({ user, handleOpen }) {
  const dispatch = useDispatch();
   
  const onDeletePostClicked = (id) => {
    try {
      dispatch(deleteUsers({ id })).unwrap();
    } catch (err) {
      console.error('Failed to delete the user', err);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card sx={{ width: "100%", border: "1px solid gray", borderRadius: "10px" }} >
          <CardContent>
              <Grid container spacing={1}>
                  <Grid item xs={22} md={2} >
                      <Avatar style={{ backgroundColor: "#006064" }}>
                          <MdAccountCircle style={{ fontSize: 25 }} />
                      </Avatar>
                  </Grid>
                  <Grid item xs={12} md={10} >
                      <Typography sx={{ fontSize: 20, fontWeight: "bold" }} gutterBottom>
                          {user.name}
                      </Typography>
                  </Grid>

                  <Grid item xs={12} md={4} >
                      <Typography sx={{ fontSize: 18, fontWeight: "bold" }} gutterBottom>
                          ID :
                      </Typography>
                  </Grid>
                  <Grid item xs={12} md={8} >
                      <Typography sx={{ fontSize: 14 }} align="left" gutterBottom>
                          {user.id}
                      </Typography>
                  </Grid>

                  <Grid item xs={12} md={4} >
                      <Typography sx={{ fontSize: 18, fontWeight: "bold" }} gutterBottom>
                          Address :
                      </Typography>
                  </Grid>
                  <Grid item xs={12} md={8} >
                      <Typography sx={{ fontSize: 14 }} align="left" gutterBottom>
                          {user.address.street}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} align="left" gutterBottom>
                          {user.address.city}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} align="left" gutterBottom>
                          {user.address.zipcode}
                      </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                  <Stack spacing={2} direction="row">
                      <Button variant="contained" style={{ textTransform:"none", backgroundColor:"#31057f" }} onClick={ () => handleOpen(user.id) }>Edit</Button>
                      <Button variant="contained" style={{ textTransform:"none", backgroundColor:"#b90937" }} onClick={ () => onDeletePostClicked(user.id) } >Delete</Button>
                  </Stack>
                  </Grid>
                  
              </Grid>
          </CardContent>

      </Card>
  </Grid>
  );
}

TileCard.propTypes = {
  user: PropTypes.object.isRequired,
};
