import * as yup from "yup";

export const listSchema = yup.object().shape({
  title: yup.string().required("List Title is required"),
});
