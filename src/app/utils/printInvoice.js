const STORE_NAME = "Kavya Creation";
const STORE_EMAIL = "kavyacreation1471@gmail.com";
const STORE_PHONE = "+91 7904749251";
const STORE_ADDRESS =
  "6/329-4, Ashok Nagar, Near Sanjeeviraya Perumal kovil, Perumagoundampatty, Elampilai, Salem, Tamil Nadu 637502";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function asText(value) {
  if (value == null || typeof value === "object") return "";
  const text = String(value).trim();
  if (!text || text === "-" || text === "—" || text.toLowerCase() === "null") {
    return "";
  }
  return text;
}

function formatMoney(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return "0";
  }
  return amount.toLocaleString("en-IN");
}

function formatAddress(order) {
  const state =
    asText(order?.state?.name) ||
    (typeof order?.state === "string" ? asText(order.state) : "");
  return [
    asText(order?.address),
    asText(order?.address1),
    asText(order?.city),
    state,
    asText(order?.pincode),
  ]
    .filter(Boolean)
    .join(", ");
}

const INVOICE_CSS = `
  #kc-invoice-print {
    position: absolute;
    left: -9999px;
    top: 0;
    width: 210mm;
    background: #fff;
    color: #141414;
    font-family: Onest, Arial, sans-serif;
  }
  #kc-invoice-print * { box-sizing: border-box; }
  #kc-invoice-print .sheet { padding: 8mm 10mm; }
  #kc-invoice-print .top {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(20, 20, 20, 0.08);
  }
  #kc-invoice-print .kicker {
    margin: 0 0 4px;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6e6d7a;
  }
  #kc-invoice-print .invoice-no {
    margin: 0 0 4px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  #kc-invoice-print .brand p,
  #kc-invoice-print .from p {
    margin: 0 0 3px;
    font-size: 13px;
    line-height: 1.5;
    color: #6e6d7a;
  }
  #kc-invoice-print .from { text-align: right; max-width: 320px; }
  #kc-invoice-print .from-label {
    display: block;
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 600;
    color: #141414;
  }
  #kc-invoice-print .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px 40px;
    margin: 20px 0;
  }
  #kc-invoice-print .group h3 {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
  }
  #kc-invoice-print .field {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 6px;
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 1.5;
  }
  #kc-invoice-print .label { color: #6e6d7a; white-space: nowrap; flex-shrink: 0; }
  #kc-invoice-print .value { font-weight: 500; color: #141414; }
  #kc-invoice-print table.items {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 8px;
  }
  #kc-invoice-print table.items th,
  #kc-invoice-print table.items td {
    padding: 10px 8px;
    font-size: 13px;
    vertical-align: middle;
    border-bottom: 1px solid rgba(20, 20, 20, 0.06);
  }
  #kc-invoice-print table.items th {
    font-size: 12px;
    font-weight: 600;
    color: #6e6d7a;
    background: #f9f9f9;
    border-bottom: 1px solid rgba(20, 20, 20, 0.08);
  }
  #kc-invoice-print .col-num { width: 36px; text-align: left; }
  #kc-invoice-print .col-desc { width: auto; }
  #kc-invoice-print .col-qty { width: 56px; text-align: right; white-space: nowrap; }
  #kc-invoice-print .col-price,
  #kc-invoice-print .col-total {
    width: 110px;
    text-align: right;
    white-space: nowrap;
  }
  #kc-invoice-print .name,
  #kc-invoice-print .muted {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
  #kc-invoice-print .name { font-weight: 600; }
  #kc-invoice-print .muted {
    color: #6e6d7a;
    font-weight: 400;
    font-size: 12px;
    margin-top: 4px;
  }
  #kc-invoice-print .money { white-space: nowrap; }
  #kc-invoice-print .totals-wrap { display: flex; justify-content: flex-end; margin-top: 18px; }
  #kc-invoice-print .totals { width: 300px; }
  #kc-invoice-print .totals .line {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 13px;
    margin-bottom: 8px;
  }
  #kc-invoice-print .totals .line span:first-child { color: #6e6d7a; }
  #kc-invoice-print .totals .line span:last-child { font-weight: 500; white-space: nowrap; }
  #kc-invoice-print .totals .grand {
    margin-top: 8px;
    padding-top: 10px;
    border-top: 1px solid rgba(20, 20, 20, 0.1);
    font-size: 15px;
  }
  #kc-invoice-print .totals .grand span:first-child { color: #141414; font-weight: 500; }
  #kc-invoice-print .totals .grand span:last-child { color: #b91d1f; font-weight: 600; white-space: nowrap; }
  #kc-invoice-print .note {
    margin: 24px 0 0;
    padding-top: 14px;
    border-top: 1px solid rgba(20, 20, 20, 0.08);
    font-size: 12px;
    line-height: 1.6;
    color: #6e6d7a;
    text-align: center;
  }
  #kc-invoice-print .green { color: #00ae76; }
  @page { size: A4; margin: 0; }
  @media print {
    html, body { background: #fff !important; }
    body.kc-invoice-printing > *:not(#kc-invoice-print) {
      display: none !important;
    }
    #kc-invoice-print {
      position: static !important;
      left: auto !important;
      width: 100% !important;
    }
  }
`;

function buildInvoiceMarkup({ order, profile }) {
  const orderNumber = asText(order?.order_number) || "—";
  const customerName = asText(order?.name) || asText(profile?.name) || "—";
  const customerEmail = asText(order?.email) || asText(profile?.email) || "—";
  const customerPhone = asText(order?.mobile) || asText(profile?.mobile) || "—";
  const customerAddress = formatAddress(order) || "—";
  const subtotal = Number(order?.total_amount) || 0;
  const discount = Number(order?.coupon_discount) || 0;
  const shipping = Number(order?.delivery_fees) || 0;
  const total = Number(order?.final_amount) || 0;
  const products = Array.isArray(order?.cart_order_products)
    ? order.cart_order_products
    : [];
  const isCod = ["cod", "cash on delivery"].includes(
    String(order?.payment_type || order?.method || "").toLowerCase()
  );

  const productRows = products.length
    ? products
        .map((item, index) => {
          const product = item?.product || {};
          const variantBits = [
            asText(item?.product_variant?.title),
            asText(item?.product_variant?.title1),
          ].filter(Boolean);
          const meta = [
            asText(product?.category?.name)
              ? `Category: ${asText(product.category.name)}`
              : "",
            variantBits.length ? variantBits.join(" | ") : "",
          ]
            .filter(Boolean)
            .join(" · ");
          const qty = item?.quantity ?? 0;
          return `
            <tr>
              <td class="col-num">${index + 1}</td>
              <td class="col-desc">
                <div class="name">${escapeHtml(asText(product?.title) || "Product")}</div>
                ${meta ? `<div class="muted">${escapeHtml(meta)}</div>` : ""}
              </td>
              <td class="col-qty">${escapeHtml(qty)}</td>
              <td class="col-price money">Rs.&nbsp;${formatMoney(item?.price)}</td>
              <td class="col-total money">Rs.&nbsp;${formatMoney(item?.total_amount)}</td>
            </tr>`;
        })
        .join("")
    : `<tr><td colspan="5" style="text-align:center;color:#6e6d7a;">No products in this order.</td></tr>`;

  return `
    <div class="sheet">
      <div class="top">
        <div class="brand">
          <p class="kicker">Tax Invoice</p>
          <h1 class="invoice-no">Invoice #${escapeHtml(orderNumber)}</h1>
          <p>Order ID: #${escapeHtml(orderNumber)}</p>
        </div>
        <div class="from">
          <span class="from-label">From</span>
          <p><strong style="font-size:15px;color:#141414;">${STORE_NAME}</strong></p>
          <p>${escapeHtml(STORE_ADDRESS)}</p>
          <p>Phone: ${escapeHtml(STORE_PHONE)}</p>
          <p>Email: ${escapeHtml(STORE_EMAIL)}</p>
        </div>
      </div>
      <div class="grid">
        <div class="group">
          <h3>Invoice To</h3>
          <div class="field"><span class="label">Full Name:</span><span class="value">${escapeHtml(customerName)}</span></div>
          <div class="field"><span class="label">Email:</span><span class="value">${escapeHtml(customerEmail)}</span></div>
          <div class="field"><span class="label">Phone:</span><span class="value">${escapeHtml(customerPhone)}</span></div>
          <div class="field"><span class="label">Address:</span><span class="value">${escapeHtml(customerAddress)}</span></div>
        </div>
        <div class="group">
          <h3>Shipping Address</h3>
          <div class="field"><span class="label">Full Name:</span><span class="value">${escapeHtml(customerName)}</span></div>
          <div class="field"><span class="label">Phone:</span><span class="value">${escapeHtml(customerPhone)}</span></div>
          <div class="field"><span class="label">Address:</span><span class="value">${escapeHtml(customerAddress)}</span></div>
        </div>
      </div>
      <h3 style="margin:0 0 10px;font-size:16px;font-weight:600;">Products</h3>
      <table class="items">
        <colgroup>
          <col class="col-num" />
          <col class="col-desc" />
          <col class="col-qty" />
          <col class="col-price" />
          <col class="col-total" />
        </colgroup>
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th class="col-desc">Description</th>
            <th class="col-qty">Qty</th>
            <th class="col-price">Price</th>
            <th class="col-total">Total</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
      </table>
      <div class="totals-wrap">
        <div class="totals">
          <div class="line"><span>Subtotal (MRP):</span><span>Rs.&nbsp;${formatMoney(subtotal)}</span></div>
          <div class="line"><span>Discount applied:</span><span>${discount > 0 ? `- Rs.&nbsp;${formatMoney(discount)}` : "Rs.&nbsp;0"}</span></div>
          <div class="line"><span>Delivery Charge:</span><span>${shipping <= 0 ? "Rs.&nbsp;0" : `Rs.&nbsp;${formatMoney(shipping)}`}</span></div>
          <div class="line grand"><span>Grand Total (incl Shipping):</span><span>Rs.&nbsp;${formatMoney(total)}</span></div>
          <div class="line"><span>Amount Paid:</span><span>${isCod ? "Rs.&nbsp;0 (COD)" : `Rs.&nbsp;${formatMoney(total)}`}</span></div>
        </div>
      </div>
      <p class="note">
        This is a computer-generated invoice and does not require a signature.<br />
        Thank you for shopping with ${STORE_NAME}. For questions about this invoice, email
        ${escapeHtml(STORE_EMAIL)} or call ${escapeHtml(STORE_PHONE)}.
      </p>
    </div>
  `;
}

export function printInvoice({ order, profile } = {}) {
  if (!order || typeof document === "undefined") {
    return false;
  }

  document.getElementById("kc-invoice-print")?.remove();
  document.getElementById("kc-invoice-print-style")?.remove();

  const style = document.createElement("style");
  style.id = "kc-invoice-print-style";
  style.textContent = INVOICE_CSS;

  const wrap = document.createElement("div");
  wrap.id = "kc-invoice-print";
  wrap.innerHTML = buildInvoiceMarkup({ order, profile });

  document.head.appendChild(style);
  document.body.appendChild(wrap);

  const previousTitle = document.title;
  document.title = " ";
  document.body.classList.add("kc-invoice-printing");

  const cleanup = () => {
    document.title = previousTitle;
    document.body.classList.remove("kc-invoice-printing");
    wrap.remove();
    style.remove();
    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);
  window.print();
  return true;
}
