export const getErrorMessageByPropertyName = (
  propertyPath: string,
  obj: Record<string, any>
): string | undefined => {
  const properties = propertyPath.split(".");
  let value = obj;
  for (const prop of properties) {
    if (value[prop]) {
      value = value[prop];
    } else {
      return undefined;
    }
  }
  return value.message;
};
