import * as yup from "yup";

export const boardSchema = yup.object().shape({
  title: yup.string().required("Board Name is required"),
});
