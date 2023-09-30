const getUserFullName = (firstName, lastName) => {
  return `${firstName ?? ""} ${lastName ?? ""}`.trim();
};

export { getUserFullName };
