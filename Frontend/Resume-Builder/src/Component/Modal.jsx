import React from "react";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      {/* Model content  */}
      <div className="relative flex flex-col bg-primary-white shadow-lg rounded-lg overflow-hidden">
        {/* Modal Header  */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-secondary-peri">
            <h3 className="md:text-lg font-medium text-primary-black">
              {title}
            </h3>

            {showActionBtn && (
              <button
                className="btn-small-light mr-12"
                onClick={() => {
                  onActionClick();
                }}
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-primary-black rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5"
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1 L13 13 M13 1 L1 13"
            />
          </svg>
        </button>

        {/* Modal Body Scrollable  */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
