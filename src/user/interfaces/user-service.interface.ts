export interface UserServiceInterface {
  getAllUsers();
  findOneById(id: number);
  getUserByEmail(email: string);
  createUser(input: any);
  updateUser(id: number, user: any);
  deleteUser(id: number);
}
