import React from "react";

export default function SlotPopup({ currentSelectedSlot }) {
  return (
    <div>
      <div id="exampleModal" className="modal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>Start Time : {currentSelectedSlot?.start?.toLocaleString()}</p>
              <p>End Time : {currentSelectedSlot?.end?.toLocaleString()}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Book slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
