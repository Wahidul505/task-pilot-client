import * as yup from "yup";

export const workspaceSchema = yup.object().shape({
  title: yup.string().required("Workspace Name is required"),
});
