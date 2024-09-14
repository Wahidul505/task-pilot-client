import * as yup from "yup";

export const templateSchema = yup.object().shape({
  templateTitle: yup.string().required("Title is required"),
});
