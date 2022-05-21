export const response = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __resolveType(response) {
    if (response) return 'response';
    return null;
  }
};
