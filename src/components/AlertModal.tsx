"use client";
import React from "react";

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

export default function AlertModal({ message, onClose }: AlertModalProps) {
  return (
    <>
      {/* The modal backdrop */}
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Alert</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
