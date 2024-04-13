export interface UserServiceInterface {
  createUser(input: any);
  deleteUser(id: number);
  getAllUsers();
  findOneById(id: number);
  getUserByEmail(email: string);
  updateUser(id: number, user: any);
  searchByNameAndEmail(searchTerms: string[]);
  addContact({ userId, contactId }: { userId: number; contactId: number });
}
