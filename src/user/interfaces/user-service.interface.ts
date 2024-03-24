export interface UserServiceInterface {
  getAllUsers();
  getUser(id: number);
  getUserByEmail(email: string);
  createUser(input: any);
  updateUser(id: number, user: any);
  deleteUser(id: number);
}
