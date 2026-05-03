import { pgSchema } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { userRoleEnum } from "./enums";

export const auth = pgSchema("auth");

export const user = auth.table("user", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  email: t.varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: t.boolean("email_verified").notNull(),
  image: t.text("image"),
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
  updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
  role: userRoleEnum("role").default("user").notNull(),
  banned: t.boolean("banned"),
  banReason: t.text("ban_reason"),
  banExpires: t.timestamp("ban_expires", { precision: 6, withTimezone: true }),
});

export const session = auth.table(
  "session",
  {
    id: t.text("id").primaryKey(),
    userId: t
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    token: t.varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: t.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    ipAddress: t.text("ip_address"),
    userAgent: t.text("user_agent"),
    impersonatedBy: t.text("impersonated_by"),
    createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
  },
  (table) => [t.index("session_user_id_idx").on(table.userId), t.index("session_token_idx").on(table.token)]
);

export const account = auth.table(
  "account",
  {
    id: t.text("id").primaryKey(),
    userId: t
      .text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accountId: t.text("account_id").notNull(),
    providerId: t.text("provider_id").notNull(),
    accessToken: t.text("access_token"),
    refreshToken: t.text("refresh_token"),
    accessTokenExpiresAt: t.timestamp("access_token_expires_at", {
      precision: 6,
      withTimezone: true,
    }),
    refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at", {
      precision: 6,
      withTimezone: true,
    }),
    scope: t.text("scope"),
    idToken: t.text("id_token"),
    password: t.text("password"),
    createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
  },
  (table) => [t.index("account_user_id_idx").on(table.userId)]
);

export const verification = auth.table(
  "verification",
  {
    id: t.text("id").primaryKey(),
    identifier: t.text("identifier").notNull(),
    value: t.text("value").notNull(),
    expiresAt: t.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
  },
  (table) => [t.index("verification_identifier_idx").on(table.identifier)]
);
