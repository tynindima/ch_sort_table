export const createPaginationArray = (users, size) => {
  return Array.from({ length: Math.ceil(users.length / size) }, (_, i) => i);
}
