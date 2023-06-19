const grays = {
  white: "#ffffff",
  "gray-100": "#f3f4f6",
  "gray-200": "#e5e7eb",
  "gray-300": "#d1d5db",
  "gray-400": "#9ca3af",
  "gray-500": "#6b7280",
  "gray-600": "#4b5563",
  "gray-700": "#374151",
  "gray-800": "#1f2937",
  "gray-900": "#111827",
  black: "#000000",
} as const;

const oranges = {
  "orange-100": "#ffedd5",
  "orange-200": "#fed7aa",
  "orange-300": "#fdba74",
  "orange-400": "#fb923c",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "orange-800": "#9a3412",
  "orange-900": "#7c2d12",
} as const;

const yellows = {
  "yellow-100": "#fef9c3",
  "yellow-200": "#fef08a",
  "yellow-300": "#fde047",
  "yellow-400": "#facc15",
  "yellow-500": "#eab308",
  "yellow-600": "#ca8a04",
  "yellow-700": "#a16207",
  "yellow-800": "#854d0e",
  "yellow-900": "#713f12",
} as const;

const reds = {
  "red-100": "#fee2e2",
  "red-200": "#fecaca",
  "red-300": "#fca5a5",
  "red-400": "#f87171",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "red-700": "#b91c1c",
  "red-800": "#991b1b",
  "red-900": "#7f1d1d",
} as const;

const greens = {
  "green-100": "#dcfce7",
  "green-200": "#bbf7d0",
  "green-300": "#86efac",
  "green-400": "#4ade80",
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "green-700": "#15803d",
  "green-800": "#166534",
  "green-900": "#14532d",
} as const;

const blues = {
  "blue-100": "#dbeafe",
  "blue-200": "#bfdbfe",
  "blue-300": "#93c5fd",
  "blue-400": "#60a5fa",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "blue-800": "#1e40af",
  "blue-900": "#1e3a8a",
} as const;

const purples = {
  "purple-100": "#f3e8ff",
  "purple-200": "#e9d5ff",
  "purple-300": "#d8b4fe",
  "purple-400": "#c084fc",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "purple-700": "#7e22ce",
  "purple-800": "#6b21a8",
  "purple-900": "#581c87",
} as const;

export const colors = {
  ...grays,
  ...reds,
  ...oranges,
  ...yellows,
  ...greens,
  ...blues,
  ...purples,
  primary: blues["blue-600"],
  secondary: oranges["orange-300"],
} as const;

export type ColorVariant = keyof typeof colors;
