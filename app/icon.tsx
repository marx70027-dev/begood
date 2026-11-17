import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
          <path
            d="M5 15 L27 85 L40 45 L28 15 Z M40 45 L53 85 L65 45 L53 15 L40 45 Z M65 45 L78 85 L95 15 L78 15 Z"
            fill="#fff"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
