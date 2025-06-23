'use client'
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const IconButton = ({ icon, label, onClick }) => (
  <div
    className="flex flex-column items-center cursor-pointer gap-1"
    onClick={onClick}
    style={{ width: "4rem" }}
  >
    {icon}
    <small className="dark-color">{label}</small>
  </div>
);

const ShareProductBox = () => {
  const [visibleBottom, setVisibleBottom] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check this out!",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      setVisibleBottom(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    } catch {
      alert("Failed to copy.");
    }
  };

  return (
    <>
      <IoShareSocialSharp
        className="primary-color fs-5 cursor-pointer"
        title="Share"
        onClick={handleShare}
      />

      <Sidebar
        visible={visibleBottom}
        position="bottom"
        onHide={() => setVisibleBottom(false)}
        dismissableMask
        showCloseIcon={false}
        style={{ height: "15rem", padding: "2rem", backgroundColor: "white" }}
      >
        <div className="flex flex-column gap-4">
          <div className="flex gap-4 justify-content-start">
            <IconButton
              icon={<FaWhatsapp size={32} color="#25D366" />}
              label="WhatsApp"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${window.location.href}`,
                  "_blank"
                )
              }
            />
            <IconButton
              icon={<FaInstagram size={32} color="#C13584" />}
              label="Instagram"
              onClick={() => alert("Instagram share not implemented")}
            />
            <IconButton
              icon={<BsThreeDotsVertical size={28} className="dark-color" />}
              label="More"
            />
          </div>

          <IconButton
            icon={<MdOutlineContentCopy size={24} className="dark-color" />}
            label="Copy Link"
            onClick={handleCopy}
          />
        </div>
      </Sidebar>
    </>
  );
};

export default ShareProductBox;
