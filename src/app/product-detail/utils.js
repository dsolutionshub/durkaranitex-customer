export function formatPrice(value) {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value || "0";
  }
  return amount.toLocaleString("en-IN");
}

export function stripHtml(value) {
  if (!value || typeof value !== "string") {
    return "";
  }
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function renderDescriptionHtml(value) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    const looksLikeJson =
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"));

    if (looksLikeJson) {
      try {
        value = JSON.parse(trimmed);
      } catch {
        // keep original string if parse fails
      }
    }
  }

  if (Array.isArray(value)) {
    return value
      .map(
        (item) =>
          `<p><strong>${item?.title || ""}</strong> ${item?.description || ""}</p>`
      )
      .join("");
  }

  if (value && typeof value === "object") {
    return `<p><strong>${value?.title || ""}</strong> ${
      value?.description || ""
    }</p>`;
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .filter((line) => line.trim())
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");
  }

  return "";
}

export function getPlainDescription(value) {
  return stripHtml(renderDescriptionHtml(value)).replace(/Disclaimer:.*$/i, "").trim();
}
