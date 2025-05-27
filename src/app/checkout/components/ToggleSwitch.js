"use client";

export default function ToggleSwitch({ enabled, setEnabled }) {
  return (
    <div className="flex items-center space-x-3 gap-3">
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        style={{ borderRadius: "50px" }}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          enabled ? "bg-green-800" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-300 ${
            enabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
      <span className="text-black font-medium">
        Use shipping address for contact address
      </span>
    </div>
  );
}
