import { getAllUserAction } from "@/actions";
import AddNewUser from "@/components/add-new-user";
import SingleUser from "@/components/single-user";

async function UserManagement() {

  const getListOfUsers = await getAllUserAction();
  console.log(getListOfUsers);

  return (
    <div className="max-w-6xl p-20">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold">User Management</h1>
            <AddNewUser/>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {
              getListOfUsers && getListOfUsers.data && getListOfUsers.data.length > 0 ?
              getListOfUsers.data.map(userItem => <SingleUser user={userItem}/>) : 
              <h2 className="text-xl font-bold">No User Found! please Add One</h2>
          }
        </div>
    </div>
  );
}

export default UserManagement;
