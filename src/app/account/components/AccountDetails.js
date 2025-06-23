export default function AccountDetails({data}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-black">Account Details</h3>
      <div className="grid grid-cols-2 gap-x-3 text-gray-700 ">
        <p className="font-medium">Name</p>
        <p>{data?.name}</p>
        <p className="font-medium">Email</p>
        <p>{data?.email}</p>
      </div>
    </div>
  );
}
