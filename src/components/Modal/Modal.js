import React, { useState } from "react";
import "./Modal.css";

function Modal({
  headerTitle = "",
  isOpen = false,
  isNoOverLay = false,
  children,
  onModalClose = () => {},
  modalStyles={}
}) {
  if (!isOpen) return null;
  return (
    <div
      id="myModal"
      class="modal"
      style={{
        backgroundColor: isNoOverLay ? "transparent" : "",
        right: isNoOverLay?'10px':''
      }}
    >
      <div class="modal-content" style={modalStyles}>
        <header className="modal-header">
          {headerTitle}
          <a
            class="dismiss"
            href="#"
            data-dismiss="modal"
            onClick={onModalClose}
            style={{
              color: "#fff",
            }}
          >
            ×
          </a>
        </header>
        {children}
      </div>
    </div>
  );
}

export default Modal;
