export function getFilteredProducts({
  products,
  search,
  priceRange,
  selectedCategories,
  sortOption,
}) {
  let result = [...products];

  //  Search filter
  if (search) {
    result = result?.filter((item) =>
      item.title?.toLowerCase()?.includes(search.toLowerCase())
    );
  }

  //  Price filter
  result = result?.filter(
    (item) => item?.price >= priceRange.min && item.price <= priceRange.max
  );

  //  Category filter
  if (selectedCategories.length > 0) {
    result = result?.filter((item) =>
      selectedCategories
        .map((c) => c.toLowerCase())
        .includes(item?.title?.toLowerCase())
    );
  }

  // Sorting
  switch (sortOption) {
    case "Name, A to Z":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Name, Z to A":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "Price, low to high":
      result.sort((a, b) => a.price - b.price);
      break;
    case "Price, high to low":
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return result;
}

// Price Format
// export function formatPrice(value) {
//   return Number(value.replace(/,/g, ""));
// }
export function formatPrice(value) {
  if (value == null) return "₹0"; 
  const stringValue = value.toString(); 
  return "₹" + stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Error Messsage
export const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    console.log("API log:", error.response.data.message);
    return error.response.data.message;
  } else if (error.message) {
    console.log("Error:", error.message);
    return error.message;
  } else {
    console.log("Unexpected error:", error);
    return "An unexpected error occurred.";
  }
};
