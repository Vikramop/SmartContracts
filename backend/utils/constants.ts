export const ROLES = {
  ADMIN: "admin",
  MINTER: "minter",
  BURNER: "burner",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const JWT_SECRET = "your_very_secret_key_change_me";
