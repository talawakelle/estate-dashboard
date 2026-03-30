/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dashboard: {
          bg: "#f3f4f6",
          canvas: "#eef2f7",
          panel: "#ffffff",
          panelSoft: "#f8fafc",
          panelMuted: "#f3f6fb",
          border: "#d9e2ec",
          borderStrong: "#c3cfdb",
          text: "#1f2937",
          heading: "#111827",
          muted: "#6b7280",
          subtle: "#94a3b8",
          red: "#d64545",
          orange: "#b26b01",
          green: "#059669",
          accent: "#2563eb",
          accentSoft: "#dbeafe"
        }
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.04)",
        panel: "0 1px 2px rgba(15, 23, 42, 0.05), 0 12px 28px rgba(15, 23, 42, 0.06)"
      },
      borderRadius: {
        panel: "18px"
      }
    }
  },
  plugins: []
};