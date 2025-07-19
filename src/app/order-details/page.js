'use client';

import { useEffect, useState , Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getOrderDetails } from '../api/services/authService';
import Image from 'next/image';

function OrderDetailsPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [order, setOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState([])
    const [products, setProducts] = useState([])

    const OrderDetails = async () => {
        console.log(id);
        const data = await getOrderDetails(id)
        console.log(data);
        setOrderDetails(data?.cartOrderProduct)
        setProducts(data?.cartOrderProduct?.cart_order_products)
    }

    useEffect(() => {
        const dummyData = {
            orderId: '123457',
            product: {
                name: 'Product Name',
                category: 'Clothing',
                price: 500,
                quantity: 2,
            },
            subtotal: 1000,
            discount: 10,
            shipping: 50,
            total: 1040,
            customer: {
                name: 'Loosu Preethi',
                email: 'MentalPreethi@gmail.com',
                phone: '1234567890',
            },
            address: {
                line1: '123 Main St',
                line2: 'Mental Hospital',
                city: 'Chattanooga',
                state: 'TN',
                zip: '37408',
                country: 'United States',
            },
            payment: 'UPI',
        };

        setOrder(dummyData);

        OrderDetails()
    }, [id]);

    if (!order) return <div className="p-6">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <h3 className="text-xl text-black font-bold mb-4">Order Details</h3>

            <div className="bg-white p-4 rounded border border-gray mb-6">
                <p className="text-sm text-black font-bold m-0">Order ID: <span className="font-light"># {orderDetails?.order_number}</span></p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <div className="bg-white p-4 rounded border border-gray">
                        <div className="flex gap-4 flex-wrap">
                            {products.map((prod, index) => (
                                <div key={index} className="flex gap-4">
                                    {/* <div className="w-24 h-24 bg-gray-100 rounded" /> */}
                                    {/* <Image
                                        src={prod?.product?.image || 'images/logo.png'}
                                        alt={prod?.product?.title || 'Product Image'}
                                        className="w-24 h-24 object-cover rounded"
                                    /> */}
                                    <div className="relative w-24 h-24">
                                        <Image
                                            src={prod?.product?.images[0]?.image}
                                            alt={prod?.product?.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-black text-sm m-0">{prod?.product?.title}</p>
                                        <p className="text-sm text-black m-0">Category: {prod?.product?.category?.name}</p>
                                        <p className="text-sm text-black m-0">Price: Rs. {prod?.price}</p>
                                        <p className="text-sm text-black m-0">Qty: {prod?.quantity}</p>
                                        <p className="font-semibold mt-2 text-black">Total: Rs. {prod?.total_amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-2 text-sm text-gray-700 space-y-1 border-t">
                            <div className="flex justify-between">
                                <span>Subtotal</span><span>Rs. {orderDetails?.total_amount}</span>
                            </div>
                            {/* <div className="flex justify-between text-red-600">
                                <span>Coupon Code (SAVE10)</span><span>- Rs. {orderDetails?.coupon_discount}</span>
                            </div> */}
                            <div className="flex justify-between">
                                <span>Shipping</span><span>Rs. {orderDetails?.delivery_fees}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-black pt-4 border-t">
                                <span>Total</span><span>Rs. {orderDetails?.final_amount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white p-4 rounded border border-gray text-black">
                        <h5 className="font-bold">Customer Information</h5>
                        <div>
                            <p className='mt-3 text-sm font-bold'>Customer:</p>
                            <p className='mt-1 text-sm'>{orderDetails?.name}</p>
                        </div>
                        <div>
                            <p className='mt-1 text-sm font-bold'>Email:</p>
                            <p className='mt-1 text-sm'>{orderDetails?.email}</p>
                        </div>
                        <div>
                            <p className='mt-1 text-sm font-bold'>Phone:</p>
                            <p className='mt-1 text-sm'>{orderDetails?.mobile}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded border border-gray text-black">
                        <h5 className="font-bold">Shipping Address</h5>
                        <p className='mt-3 text-sm'>{orderDetails?.address}</p>
                        <p className='mt-1 text-sm'>{orderDetails?.city}, {order.address.state} {orderDetails?.pincode}</p>
                        <p className='mt-1 text-sm font-bold'>Payment Method:</p>
                        <p className='mt-1 text-sm'>{orderDetails?.payment_type}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WrappedOrderDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailsPage />
    </Suspense>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Dialog } from "primereact/dialog";
// import { Dropdown } from "primereact/dropdown";
// import { MdOpenInNew } from "react-icons/md";

// // import CustomButton from "../components/CustomButton/button";
// // import DeleteDialog from "../components/deleteDialog/dialog";
// import Tooltip from "../components/tooltip/page";
// // import TrackingInfo from "./trackingInfo";
// import { toastCom } from "../components/toast/ToastManager";
// import CustomTable from "../components/customTable/table";
// import { getErrorMessage, getStatusStyle } from "../utils/helperFn";
// import { ORDER_MSG, STATUS_CHANGED_MSG } from "../utils/constant";
// import orderDatas from "./ordersData.json";
// import { loader } from "../components/loader/loaderManager";
// import { getOrderList } from "../api/services/authService";
// import CustomButton from "../components/CustomButton/page";
// import DeleteDialog from "../components/deleteDialog/page";
// import TrackingInfo from "./trackingInfo";

// const renderActions = (row, handleNavigateDetails) => (
//   <div className="flex align-items-center gap-3">
//     <Tooltip content="View Detail" bgColor="var(--primary-main)">
//       <MdOpenInNew
//         className="cursor-pointer hover:text-green-500 text-lg"
//         onClick={() => handleNavigateDetails(row)}
//       />
//     </Tooltip>
//   </div>
// );

// const renderTrackingButton = (row, handeTracking) => (
//   <div className="flex items-center gap-2">
//     <CustomButton
//       label={row.trackingNo ? "View" : "Add"}
//       bgColor="transparent"
//       color={row.trackingNo ? "var(--primary-main)" : "var(--checkbox-bg)"}
//       style={{
//         border: `1.5px solid ${
//           row.trackingNo ? "var(--primary-main)" : "var(--checkbox-bg)"
//         }`,
//         padding: ".3rem .5rem",
//         width: "3.5rem",
//       }}
//       onClick={() => {
//         handeTracking(row?.trackingNo || "");
//       }}
//     />
//   </div>
// );

// const renderStatusDropdown = (row, handleStatusChange) => {
//   const statuses = [
//     { label: "Ordered", value: "ordered" },
//     { label: "Processing", value: "processing" },
//     { label: "Shipment", value: "shipment" },
//     { label: "Delivered", value: "delivered" },
//     { label: "Cancel", value: "cancel" },
//   ];

//   const itemTemplate = (option) => {
//     const style = getStatusStyle(option.value);
//     return (
//       <div
//         style={{
//           padding: ".2rem .3rem",
//           borderRadius: "1rem",
//           margin: ".6rem .5rem",
//           fontSize: ".8rem",
//           textAlign: "center",
//           ...style,
//         }}
//       >
//         {option.label}
//       </div>
//     );
//   };

//   return (
//     <Dropdown
//       value={row.status}
//       options={statuses}
//       onChange={(e) => handleStatusChange(row.id, e.value)}
//       itemTemplate={itemTemplate}
//       style={{
//         ...getStatusStyle(row.status),
//         padding: ".3rem 0 .3rem .4rem",
//         borderRadius: "4px",
//         fontSize: "0.9rem",
//       }}
//       className="w-[8.3rem] custom-status-dropdown rounded"
//     />
//   );
// };

// export default function Orders() {
//   const router = useRouter();
//   const [orderData, setOrderData] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [search, setSearch] = useState("");
//   const [showDialog, setShowDialog] = useState(false);
//   const [trackingNo, setTrackingNo] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditTracking, setIsEditTracking] = useState(false);

//   const handleStatusChange = (id, newStatus) => {
//     setOrderData((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, status: newStatus } : item
//       )
//     );
//     toastCom(STATUS_CHANGED_MSG, true, "success", 2000);
//   };

//   const handleNavigateDetails = (item) => {
//     router.push(`/orders/orderDetail`);
//   };

//   const handleConfirmDelete = () => {
//     toastCom(ORDER_MSG.oredrDeleteMsg, true, "success", 2000);
//     setIsModalOpen(false);
//   };

//   const handeTracking = (trackingNo) => {
//     setShowDialog(true);
//     setTrackingNo(trackingNo);
//     setIsEditTracking(Boolean(trackingNo));
//   };

//   const handleGetOrderList = async () => {
//     loader(true);
//     try {
//       const data = await getOrderList(1, '', search, '', '');
//       console.log(data);

//       // setOrderData(data?.categories || []);
//     } catch (error) {
//       const MSG = getErrorMessage(error);
//       toastCom(MSG || API_ERROR_MSG, true, "error", 3000);
//     } finally {
//       loader(false);
//     }
//   };

//   const columns = [
//     { header: "ORDER ID", accessor: "id", sort: true },
//     { header: "ORDER TIME", accessor: "orderTime", sort: true },
//     { header: "CUSTOMER NAME", accessor: "customerName", sort: true },
//     { header: "METHOD", accessor: "method", sort: true, filter: true },
//     { header: "AMOUNT", accessor: "amount", sort: true },
//     {
//       header: "STATUS",
//       accessor: "status",
//       sort: true,
//       filter: true,
//       body: (row) => renderStatusDropdown(row, handleStatusChange),
//     },
//     {
//       header: "TRACKING NO",
//       accessor: "trackingNo",
//       body: (row) => renderTrackingButton(row, handeTracking),
//     },
//     {
//       header: "ACTIONS",
//       accessor: "actions",
//       body: (row) => renderActions(row, handleNavigateDetails),
//     },
//   ];

//   useEffect(() => {
//     setOrderData(orderDatas);
//     handleGetOrderList();
//   }, []);

//   return (
//     <div className="mt-3">
//       <h5 className="pl-5 font-medium">Orders</h5>

//       <div className="flex justify-start w-90 full relative ml-5 my-2">
//         <input
//           className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white border-gray-200 dark:border-gray-600 pr-10"
//           placeholder="Search Order"
//           type="search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <CustomTable
//         data={orderData}
//         columns={columns}
//         onRowClick={(row) => console.log("Clicked row:", row.id)}
//         search={search}
//       />

//       <DeleteDialog
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleConfirmDelete}
//         selectedUser={selectedUser}
//       />

//       <Dialog
//         header={isEditTracking ? "Edit Tracking" : "Add tracking"}
//         visible={showDialog}
//         onHide={() => setShowDialog(false)}
//         className="w-[40rem]"
//         pt={{ header: { className: "p-4" } }}
//       >
//         <TrackingInfo
//           setShowDialog={setShowDialog}
//           isEditTracking={isEditTracking}
//         />
//       </Dialog>
//     </div>
//   );
// }