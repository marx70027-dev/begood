"use client";

import "./launch-button.css";

interface LaunchButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function LaunchButton({ onClick, disabled }: LaunchButtonProps) {
  return (
    <button
      className="launch-btn"
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <span className="launch-btn-top">
        <span className="launch-btn-label">🚀 LAUNCH</span>
      </span>
      <span className="launch-btn-bottom" />
      <span className="launch-btn-base" />
    </button>
  );
}
