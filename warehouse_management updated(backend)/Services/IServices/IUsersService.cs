using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface IUsersService
    {

        List<string> GetUsers();
        Users GetUsersById(string id);
        void CreateUser(Users users);

       public Users GetUserByUsername(string username);

        public Users GetUserByRoles(string roles);
    }
}
