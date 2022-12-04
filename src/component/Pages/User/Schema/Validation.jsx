import * as yup from "yup";

export const BasicSchema = yup.object().shape({
    name: yup.string('Enter your name').required("Enter your name"),
    street: yup.string('Enter your street').required("Enter your street"),
    city: yup.string('Enter your city').required("Enter your city"),
    zipcode: yup.number('Enter your zipcode').positive().integer().required("Enter your zipcode"),
})