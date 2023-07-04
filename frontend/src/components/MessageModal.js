import "./MessageModal.css";

// component handles all messages when events occur ie delete, save etc
const MessageModal = (props) => {
  // function to close message modal.
  const handleClose = () => {
    if (props.closeForm) {
      props.closeModal();
      props.closeForm();
    } else {
      props.closeModal();
    }
  };

  return (
    <div>
      {props.showModal && (
        <>
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content p-3">
                <div className="modal-body message-body">
                  <h5 className="text-success">{props.message}</h5>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            onClick={props.closeModal}
          ></div>
        </>
      )}
    </div>
  );
};

export default MessageModal;
