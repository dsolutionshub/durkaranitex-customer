export default function AddressCard({
  addressList,
  handleDeleteAddress,
  handleSelectAddress,
  handleOpenModel,
  handleEditAddress,
  checkoutData,
}) {
  return (
    <div className="aq-checkout-bill-area">
      <div className="aq-checkout-bill-head">
        <h3 className="aq-checkout-bill-title">Billing Details</h3>
        {/* <button
          type="button"
          className="aq-checkout-add-btn"
          onClick={() => handleOpenModel("add")}
        >
          Add New Address
        </button> */}
      </div>

      {addressList?.length === 0 ? (
        <div className="aq-checkout-empty">
          <h4>No delivery address yet</h4>
          <p>Add your first delivery address to continue with your order.</p>
          <button
            type="button"
            className="aq-checkout-btn"
            onClick={() => handleOpenModel("add")}
          >
            Add New Address
          </button>
        </div>
      ) : (
        <div className="aq-address-list">
          {addressList?.map((address) => {
            const isSelected = checkoutData?.address?.id === address.id;
            return (
              <div
                key={address.id}
                className={`aq-address-item${isSelected ? " is-selected" : ""}`}
                onClick={() => {
                  if (!isSelected) {
                    handleSelectAddress(address.id);
                  }
                }}
              >
                <div className="aq-checkout-option">
                  <input
                    type="radio"
                    id={`address-${address.id}`}
                    name="address"
                    value={address.id}
                    checked={isSelected}
                    onChange={() => handleSelectAddress(address.id)}
                  />
                  <label htmlFor={`address-${address.id}`} />
                </div>
                <div className="aq-address-body">
                  <h5 className="aq-address-name">{address.name}</h5>
                  <p className="aq-address-lines">
                    {address.address}
                    {address.address1 ? `, ${address.address1}` : ""}
                    <br />
                    {address.city}, {address?.state?.name} - {address.pincode}
                  </p>
                </div>
                <div className="aq-address-actions">
                  <button
                    type="button"
                    className="aq-address-action"
                    aria-label="Edit address"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEditAddress(address.id);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.00033 13.666L1.33301 14.6667L2.33366 11L11.333 2.00004Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="aq-address-action"
                    aria-label="Delete address"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 2H10M2 4H14M12.6667 4L12.1991 11.9417C12.129 13.1032 11.1622 14 9.99808 14H6.00192C4.83783 14 3.87097 13.1032 3.80087 11.9417L3.33333 4M6.66667 7V10.6667M9.33333 7V10.6667"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
