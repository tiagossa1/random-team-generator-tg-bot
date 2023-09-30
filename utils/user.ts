/**
 * Combines a user's first name and last name to form their full name.
 *
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @returns {string} The full name of the user, with leading and trailing spaces removed.
 *
 */
const getUserFullName = (firstName: string, lastName: string): string => {
  return `${firstName ?? ""} ${lastName ?? ""}`.trim();
};

export { getUserFullName };
