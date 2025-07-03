import { Edit, Home, MapPin, Package, Plus, Trash2 } from "lucide-react";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";

export default function AddressCard({
  addressList,
  handleDeleteAddress,
  handleSelectAddress,
  handleOpenModel,
  setSelectedAddressId,
  checkoutData,
}) {
  return (
    <div className="shadow-lg border-0 rounded-lg overflow-hidden bg-white">
      <div className="bg-gradient-to-r from-green-50 to-green-50  p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--primary-light)] rounded-lg flex-shrink-0">
              <Package className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--primary-main)]" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-0 dark-color">
                Delivery Address
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-normal mb-0">
                Choose where you want your order delivered
              </p>
            </div>
          </div>
          <button
            onClick={() => handleOpenModel("add")}
            className="bg-gradient-to-r from-[var(--primary-main)] to-[var(--primary-main)] hover:from-[var(--primary-dark)]
              hover:to-[var(--primary-dark)] 
              text-white shadow-md hover:shadow-lg transition-all duration-200 w-full 
              sm:w-auto text-sm sm:text-base px-4 py-2 rounded-md flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {addressList?.length === 0 ? (
          <div className="text-center py-8 sm:py-12 flex flex-column items-center">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-light)] 
            rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <Home className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--primary-main)]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 dark-color">
              No delivery address yet
            </h3>
            <p className="text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
              Add your first delivery address to continue with your order.
              We&apos;ll save it for future purchases too!
            </p>
            <button
              onClick={() => handleOpenModel("add")}
              className="bg-gradient-to-r from-[var(--primary-main)] to-[var(--primary-main)] hover:from-[var(--primary-dark)]
              hover:to-[var(--primary-dark)] text-white px-6 sm:px-8 py-2 sm:py-3 
              rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Add New Address
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[22rem] overflow-y-auto custom-scroll">
            {addressList?.map((address) => {
              const isSelected = checkoutData?.address?.id === address.id;
              return (
                <div key={address.id} className="flex items-start gap-3 ml-1">
                  <RadioButton
                    inputId={`address-${address.id}`}
                    value={address.id}
                    checked={isSelected}
                    onChange={handleSelectAddress}
                    className="mt-3"
                    style={{
                      outline: "none",
                      transform: "scale(1.5)",
                    }}
                  />

                  <div
                    className={`flex-1 px-4 py-3 rounded-md relative transition-all duration-300 border-l-5
                        border-b-1 border-r-1 border-t-1 border-green-800 ${
                          isSelected
                            ? "border-green-800 bg-green-50 shadow"
                            : "border-gray-200 bg-white "
                        }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                      <div className="flex flex-col md:flex-row gap-3 items-start">
                        <div
                          className={`p-2 rounded-full ${
                            isSelected ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Home
                            className={`h-5 w-5 ${
                              isSelected ? "text-green-600" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex gap-2 items-center mb-1">
                            <h5 className="text-gray-900 text-base mb-0 dark-color">
                              {address.name}
                            </h5>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-600 mt-[.3rem]" />
                            <div>
                              <p className="mb-0 fw-medium dark-color">
                                {address.address}
                              </p>
                              <p className="mb-0 fw-medium dark-color">
                                {address.address1}
                              </p>
                              <p className="text-sm text-gray-600 mb-0">
                                {address.city}, {address?.state?.name} -{" "}
                                <span className="font-medium">
                                  {address.pincode}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          icon={<Edit className="h-4 w-4" />}
                          className="p-button-text p-button-sm text-gray-600 d-none"
                          onClick={() => {
                            handleOpenModel("edit");
                            setSelectedAddressId(address.id);
                          }}
                        />
                        <Button
                          icon={<Trash2 className="h-4 w-4" />}
                          className="p-button-text p-button-sm text-red-600"
                          onClick={() => handleDeleteAddress(address.id)}
                        />
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
