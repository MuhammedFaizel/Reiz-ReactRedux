import React from 'react'
import { Modal, Card, CardContent, CardHeader, Grid, Button, TextField, Typography} from '@mui/material';
import { useFormik } from "formik";
import { BasicSchema } from './Schema/Validation';
import { useDispatch } from "react-redux";
import { updateUsers } from '../../../Features/userSlice';

function EditForm({ open, handleClose }) {
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const data={
      id: open,
      name:values.name,
      address: {
        street: values.street,
        city: values.city,
        zipcode: values.zipcode
      }
    }
    try {
     await dispatch(updateUsers(data)).unwrap();
    } catch (error) {
      console.log("this is the error",error);
      console.error(error.messege)
    }
    
    actions.resetForm()
    handleClose()
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      street: "",
      city: "",
      zipcode: "",
      email: "",
    },
    validationSchema: BasicSchema,
    onSubmit,
  })



  
  return (
    <>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open ? true : false} onClose={handleClose}>
        <Card className="modal__view">
          <CardHeader className="modal__card__header" title="Add New User" />
          <CardContent>
            <form onSubmit={formik.handleSubmit} >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography gutterBottom style={{ fontSize: 15 }} > Name</Typography>
                  <TextField id="name" name="name" size="small" fullWidth variant="outlined"
                    value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography gutterBottom style={{ fontSize: 15 }} > Street</Typography>
                  <TextField id="street" name="street" size="small" fullWidth variant="outlined"
                    value={formik.values.street} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.street && Boolean(formik.errors.street)}
                    helperText={formik.touched.street && formik.errors.street}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography gutterBottom style={{ fontSize: 15 }} > City</Typography>
                  <TextField id="city" size="small" name="city" fullWidth variant="outlined"
                    value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography gutterBottom style={{ fontSize: 15 }} > Zipcode</Typography>
                  <TextField id="zipcode" name="zipcode" size="small" type="number" fullWidth variant="outlined"
                    value={formik.values.zipcode} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                    helperText={formik.touched.zipcode && formik.errors.zipcode}
                  />
                </Grid>


              </Grid>
              <div style={{ marginTop: "8px", paddingTop: "8px", display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting} >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}

export default EditForm