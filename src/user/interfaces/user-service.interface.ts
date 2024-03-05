//TODO
//add DTOs
export interface UserServiceInterface {
  getAllUsers();
  getUser(id: number);
  createUser(input: any);
  updateUser(id: number, user: any);
  deleteUser(id: number);
}
