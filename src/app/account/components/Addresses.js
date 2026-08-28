"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteAddress,
  getCustomerAddressList,
  getSelectAddress,
} from "@/app/api/services/authService";
import { getErrorMessage } from "@/app/utils/helperFn";
import { loader } from "@/app/components/loader/loaderManager";
import AddAdressModel from "@/app/checkout/components/AddAdressModel";
import TabLoader from "./TabLoader";

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
    <path d="M16.71 5.45L8.86 0.11C8.76 0.04 8.63 0 8.5 0C8.37 0 8.24 0.04 8.14 0.11L0.29 5.45C0.08 5.59 0 5.79 0 6V14.67C0 15.4 0.6 16 1.31 16H15.69C16.4 16 17 15.4 17 14.67V6C17 5.79 16.92 5.59 16.71 5.45ZM8.5 1.47L15.19 6.02L9.72 10H7.28L1.81 6.02L8.5 1.47ZM1.31 14.67V7.29L6.69 11.21C6.8 11.29 6.94 11.34 7.07 11.34H9.93C10.06 11.34 10.2 11.29 10.31 11.21L15.69 7.29V14.67H1.31Z" fill="#5F6063" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M16.3 16.75C14.19 18 5.81 18 0 5.04C0 2.62 1.25 0.77 4.4 0.01C5.78 0.17 6.8 1.11 7.8 5.11L5.76 8.77C6.43 10.14 7.87 11.56 9.25 12.24L11.45 10.37C12.88 10.2 17.13 12.1 17.99 13.6C17.23 15.94 16.3 16.75 16.3 16.75Z" fill="#5F6063" />
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 20" fill="none">
    <path d="M15.48 8.11C15.48 13.84 8.11 18.75 8.11 18.75C8.11 18.75 0.75 13.84 0.75 8.11C0.75 6.16 1.53 4.29 2.91 2.91C4.29 1.53 6.16 0.75 8.11 0.75C10.07 0.75 11.94 1.53 13.32 2.91C14.7 4.29 15.48 6.16 15.48 8.11Z" stroke="#5F6063" strokeWidth="1.5" />
    <path d="M8.11 10.57C9.47 10.57 10.57 9.47 10.57 8.11C10.57 6.76 9.47 5.66 8.11 5.66C6.76 5.66 5.66 6.76 5.66 8.11C5.66 9.47 6.76 10.57 8.11 10.57Z" stroke="#5F6063" strokeWidth="1.5" />
  </svg>
);

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [addressDetail, setAddressDetail] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseModel = () => setIsModalOpen(false);

  const handleOpenModel = (value) => {
    setIsEdit(value === "edit");
    setIsModalOpen(true);
  };

  const getAddressList = async (showTabLoader = false) => {
    if (showTabLoader) setIsLoading(true);
    loader(true);
    try {
      const { data } = await getCustomerAddressList();
      setAddresses(data || []);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setIsLoading(false);
      loader(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    loader(true);
    try {
      const data = await deleteAddress("", id);
      getAddressList();
      toast.success(data?.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  const handleEditAddress = async (addressId) => {
    loader(true);
    try {
      const data = await getSelectAddress(addressId);
      handleOpenModel("edit");
      setAddressDetail(data?.addresss);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      loader(false);
    }
  };

  useEffect(() => {
    getAddressList(true);
  }, []);

  return (
    <div className="aq-dashboard-wrapper aq-dash-pt-30">
      <h3 className="aq-dashboard-title">Address books</h3>
      <div className="aq-dashboard-content-layout aq-dash-mb-40">
        <div className="aq-dashboard-addrs-wrapper">
          <div className="welcome-text">
            <h2>Your Addresses</h2>
            <p>Manage your shipping and billing addresses</p>
          </div>

          {isLoading ? (
            <TabLoader />
          ) : (
            addresses.map((address, index) => {
            const line = [
              address.address,
              address.address1,
              address.city,
              address.state?.name,
              address.pincode,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <div className="aq-dashboard-addrs-card" key={address.id ?? index}>
                <div className="aq-dashboard-addrs-header">
                  <h3 className="aq-dashboard-addrs-name">
                    {index === 0 ? "Primary Address" : address.name}
                  </h3>
                </div>
                <div className="aq-dashboard-addrs-wrap">
                  <div className="aq-dashboard-addrs-body">
                    <div className="aq-dashboard-addrs-info-item">
                      <MailIcon />
                      <span>{address.email}</span>
                    </div>
                    <div className="aq-dashboard-addrs-info-item">
                      <PhoneIcon />
                      <span>{address.mobile}</span>
                    </div>
                    <div className="aq-dashboard-addrs-info-item">
                      <PinIcon />
                      <span>{line}</span>
                    </div>
                  </div>
                  <div className="aq-dashboard-addrs-actions">
                    <button
                      type="button"
                      className="aq-dashboard-addrs-link aq-dashboard-addrs-link--edit"
                      onClick={() => handleEditAddress(address.id)}
                    >
                      Edit
                    </button>
                    <span className="aq-dashboard-addrs-divider" />
                    <button
                      type="button"
                      className="aq-dashboard-addrs-link aq-dashboard-addrs-link--delete"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
          )}

          {!isLoading ? (
          <div className="aq-dashboard-addrs-promo">
            <div className="aq-dashboard-addrs-promo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                <path d="M5.72 1.99C8.79 0.31 12.57 0.34 15.61 2.07C18.62 3.83 20.45 6.98 20.44 10.36C20.37 13.72 18.4 16.88 15.95 19.33C14.53 20.74 12.95 22 11.22 23.06C10.1 23.19 3.3 17.07 0.75 10.19C0.88 6.58 2.75 3.61 5.72 1.99Z" stroke="#37383A" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="aq-dashboard-addrs-promo-content">
              <h4 className="aq-dashboard-addrs-promo-title">Need another address?</h4>
              <p className="aq-dashboard-addrs-promo-text">
                Add multiple addresses for different shipping locations or billing purposes.
              </p>
              <button
                type="button"
                className="aq-dashboard-addrs-btn-add"
                onClick={() => handleOpenModel("add")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add Another Address
              </button>
            </div>
          </div>
          ) : null}
        </div>
      </div>

      <AddAdressModel
        isModalOpen={isModalOpen}
        handleCloseModel={handleCloseModel}
        isEdit={isEdit}
        getAddressList={getAddressList}
        addressDetail={addressDetail}
      />
    </div>
  );
}
