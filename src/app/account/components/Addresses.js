// import { useState } from "react";
// import AddressForm from "../components/AddressForm";
// import { HiOutlineLocationMarker, HiPencil, HiTrash } from "react-icons/hi";
// import {
//   HiOutlineMail,
//   HiOutlinePhone,
//   HiOutlineHome,
//   HiOutlineUser,
// } from "react-icons/hi";

// export default function AddressPage() {
//   const [addresses, setAddresses] = useState([
//     {
//       id: 1,
//       fullName: "Preethi P",
//       email: "preethi@example.com",
//       phone: "9876543210",
//       street: "123 MG Road",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       isDefault: true,
//     },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(null);

//   const handleDelete = (id) => {
//     setAddresses(addresses.filter((addr) => addr.id !== id));
//   };

//   const handleEdit = (address) => {
//     setEditingAddress(address);
//     setShowForm(true);
//   };

//   const handleSave = (data) => {
//     if (editingAddress) {
//       // Update existing address
//       setAddresses((prev) =>
//         prev.map((a) => (a.id === editingAddress.id ? { ...data, id: a.id } : a))
//       );
//     } else {
//       // Add new address
//       setAddresses((prev) => [...prev, { ...data, id: Date.now() }]);
//     }
//     setEditingAddress(null);
//     setShowForm(false);
//   };

//   const handleCancel = () => {
//     setEditingAddress(null);
//     setShowForm(false);
//   };

//   return (
//     <div className="min-h-screen bg-white p-6 max-w-3xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-2xl font-semibold text-black">Address</h3>
//         <button
//           onClick={() => {
//             setEditingAddress(null);
//             setShowForm(true);
//           }}
//           className="bg-green-800 text-white px-4 py-2 rounded hover:bg-gray-700"
//         >
//           Add a new address
//         </button>
//       </div>

//       {addresses.length === 0 ? (
//         <div className="text-center py-10 text-lg text-gray-700">
//           <HiOutlineLocationMarker className="mx-auto text-4xl mb-2 text-green-800" />
//           Your Address box is Empty Now..!
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {addresses.map((address) => (
//             <div
//               key={address.id}
//               className={`border p-4 rounded-md shadow-sm ${address.isDefault ? "border-blue-600" : "border-gray-300"
//                 }`}
//             >
//               <div className="flex justify-between text-black">
//                 {/* <div>
//                   <p className="font-semibold">{address.fullName}</p>
//                   <p>{address.email}</p>
//                   <p>{address.phone}</p>
//                   <p>{address.street}, {address.city}, {address.state}</p>
//                 </div> */}
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <HiOutlineUser />
//                     <p className="font-semibold m-0">{address.fullName}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <HiOutlineMail />
//                     <p className="m-0">{address.email}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <HiOutlinePhone />
//                     <p className="m-0">{address.phone}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <HiOutlineHome />
//                     <p className="m-0">{address.street}, {address.city}, {address.state}</p>
//                   </div>
//                   {address.isDefault && (
//                     <span className="text-sm text-green-800 font-medium">Default Address</span>
//                   )}
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleEdit(address)}
//                     className="text-green-800 flex items-center gap-1 hover:underline"
//                   >
//                     <HiPencil className="text-lg" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(address.id)}
//                     className="text-green-800 flex items-center gap-1 hover:underline"
//                   >
//                     <HiTrash className="text-lg" />
//                     Delete
//                   </button>

//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <AddressForm
//         visible={showForm}
//         initialData={editingAddress}
//         onSave={handleSave}
//         onCancel={handleCancel}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import AddressForm from "../components/AddressForm";
import { MapPin, User, Mail, Phone, Home, Edit, Trash } from "lucide-react";
import { deleteAddress, getCustomerAddressList, getStateList } from "@/app/api/services/authService";
import { GET_STATE_LIST } from "@/app/utils/apiEndpoints";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleEdit = async (address) => {
    setEditingAddress(address);
    setShowForm(true);
    const state_list = await GET_STATE_LIST()
    console.log(state_list);
  };

  const handleSave = (data) => {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id ? { ...data, id: a.id } : a
        )
      );
    } else {
      setAddresses((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setEditingAddress(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingAddress(null);
    setShowForm(false);
  };

  const getAddressList = async()=>{
    const {data} = await getCustomerAddressList()
    console.log(data)
    setAddresses(data)
  }

  const handleDelete = async (id) => {
    // setAddresses(addresses.filter((addr) => addr.id !== id));
    const data = await deleteAddress(addresses, id)
    getAddressList()
  };

    // {
    //   id: 1,
    //   fullName: "Preethi",
    //   email: "preethi@example.com",
    //   phone: "9876543210",
    //   street:
    //     "6/380, Ashok Nagar, Perumagoundampatti, Salem, Tamil Nadu 637502",
    //   city: "Chennai",
    //   state: "Tamil Nadu",
    //   isDefault: true,
    // },

  useEffect(()=>{
     getAddressList()
  },[])

  return (
    <div className="mx-auto">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-black">
          My Addresses
        </h3>
        <button
          onClick={() => {
            setEditingAddress(null);
            setShowForm(true);
          }}
          className="bg-green-800 text-white w-38 py-2 rounded hover:bg-green-700 text-sm"
        >
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-10 text-lg text-gray-700">
          <MapPin className="mx-auto text-4xl mb-2 text-green-800" />
          Your address list is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div
              key={address.id ?? index}
              className={`border rounded-md shadow-sm flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start ${
                address.isDefault ? "border-green-600" : "border-gray-300"
              } p-6 sm:p-4`}
            >
              {/* Address Info */}
              <div className="space-y-2 text-base text-black">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 shrink-0" />
                  <span className="font-semibold">{address.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>{address.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>{address.mobile}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Home className="w-5 h-5 mt-0.5 shrink-0" />
                  <span className="leading-snug">
                    {address.address}, {address.pincode}, {address.city}
                  </span>
                </div>

                {/* Default Address badge + mobile icons */}
                <div className="flex items-center justify-between sm:justify-start sm:gap-2 mt-2">
                  {address.isDefault && (
                    <span className="inline-block bg-green-100 text-green-800 text-medium font-medium px-2 py-1 rounded-md">
                      Default Address
                    </span>
                  )}

                  {/* Icons on same line in mobile */}
                  <div className="flex gap-2 sm:hidden">
                    <button
                      onClick={() => handleEdit(address)}
                      className="text-green-800 hover:text-black"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-red-800 hover:text-black"
                      title="Delete"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop icons on right */}
              <div className="hidden sm:flex gap-2 mt-1 sm:mt-0">
                <button
                  onClick={() => handleEdit(address)}
                  className="text-green-800 hover:text-black"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-green-800 hover:text-black"
                  title="Delete"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressForm
        visible={showForm}
        initialData={editingAddress}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
