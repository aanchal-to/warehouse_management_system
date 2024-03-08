using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface IUsersRepository
    {
        public List<string> GetUsers();
        Users GetUsersById(string id);

        public Users GetUserByUsername(string username);

        public Users GetUserByRoles(string roles);

        void CreateUser(Users users);
    }
}
