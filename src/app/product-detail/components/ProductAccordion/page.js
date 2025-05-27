import "../../style.css";

export default function ProductAccordion({
  sections,
  openIndex,
  toggleAccordion,
  handleDecrease,
  handleIncrease,
  quantity,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black">
        Maroon Colour Kalyani Cotton Saree
      </h2>
      <div className="text-lg text-green-600 font-semibold mt-2">
        Rs. 1,250.00{" "}
        <span className="text-gray-500 line-through text-sm">Rs. 2,048.00</span>
      </div>

      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        {sections?.map((section, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <button
                className="product-accordion-button"
                onClick={() => toggleAccordion(index)}
              >
                {section.title}
                <span style={{ fontSize: "18px" }}>{isOpen ? "➖" : "➕"}</span>
              </button>

              <div
                style={{
                  maxHeight: isOpen ? "200px" : "0px",
                  overflow: "hidden",
                  opacity: isOpen ? "1" : "0",
                  padding: isOpen ? "10px" : "0px 10px",
                  transition:
                    "max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease",
                  fontSize: "14px",
                  color: "#01279",
                  fontWeight: "500",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="flex items-center border rounded">
          <button
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l"
            onClick={handleDecrease}
          >
            -
          </button>
          <input
            type="text"
            className="w-12 text-center border-t border-b border-gray-300"
            value={quantity}
            readOnly
          />
          <button
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-3 md:space-y-0 md:space-x-3 gap-3">
          <button className="bg-black text-white px-6 py-2 rounded text-sm w-full md:w-auto font-bold">
            Add To Cart
          </button>
          <button className="bg-green-800 text-white px-6 py-2 rounded text-sm w-full md:w-auto font-bold">
            Buy Now
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 cursor-pointer">
        ❤️ Add to wishlist
      </div>
    </div>
  );
}
