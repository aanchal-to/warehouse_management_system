using warehouse_management.Models;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class UsersService : IUsersService { 

        IUsersRepository _usersRepository;
        public UsersService(IUsersRepository usersrepo)
        {
            _usersRepository = usersrepo;
        }
        public List<string> GetUsers()
        {
            throw new NotImplementedException();
        }

        public Users GetUsersById(string id)
        {
            return _usersRepository.GetUsersById(id);
        }

        public Users GetUserByUsername(string username)
        {
            return _usersRepository.GetUserByUsername(username);
        }

        public Users GetUserByRoles(string roles)
        {
            return _usersRepository.GetUserByRoles(roles);
        }

        public void CreateUser(Users users)
        {
            _usersRepository.CreateUser(users);
        }
    }
}
