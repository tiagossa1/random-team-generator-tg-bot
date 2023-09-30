const getUserFullName = (firstName: string, lastName: string) => {
  return `${firstName ?? ""} ${lastName ?? ""}`.trim();
};

export { getUserFullName };
