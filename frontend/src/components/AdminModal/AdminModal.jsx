import React from "react";
import "./AdminModal.css";

function AdminModal() {
  const cancelAdminModal = () => {
    // function to close modal
  };

  const addAdminModal = () => {
    // function to add admins
  };

  return (
    <div className="adminModal">
      <div className="adminModal-container">
        <div className="adminModal-innerContainer">
          <h2>Add Admins</h2>
          <p>
            Persons added here will identified as admins and can be able to
            create notices to be published on the notice board.
          </p>
          <div className="adminModal-buttons">
            <button className="cancelButton" onClick={() => cancelAdminModal()}>
              Cancel
            </button>
            <button className="addButton" onClick={() => addAdminModal()}>
              Add Admins
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminModal;
