import DataTable from "@/components/datatable/DataTable";
import RegisterUser from "@/components/forms/RegisterUser";

const UserAdministration = () => {
  const user = [{ email: "danielonduka@gmail.com", index: 1 }];
  const columns = [
    {
      label: "S/N",
      render: (user) => employee.index,
      sortFunction: () => (item) => item.index,
    },
    {
      label: "Email",
      render: (user) => <span>{user.email}</span>,
      sortFunction: () => (user) => user.email,
    },
    {
      label: "actions",
      render: (user) => (
        <i className="AiOutlineDelete" onClick={handleDelete}></i>
      ),
    },
  ];

  const handleDelte = () => {
    //TODO: handle delete user
  };
  return (
    <div className="flex-auto">
      <RegisterUser />
      <DataTable data={[]} columns={columns} />
    </div>
  );
};

export default UserAdministration;
