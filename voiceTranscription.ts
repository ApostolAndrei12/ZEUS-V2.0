import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * STOC REAL - Active contracts where delivery is pending
 * 24 columns from Excel
 */
export const stocReal = mysqlTable("stoc_real", {
  id: int("id").autoincrement().primaryKey(),
  produs: text("produs"),
  deComandat: text("de_comandat"),
  disponibilVanzare: text("disponibil_vanzare"),
  vanzator: text("vanzator"),
  status: text("status"),
  cumparator: text("cumparator"),
  raspunsuriVanzatori: text("raspunsuri_vanzatori"),
  comenziDeLucru: text("comenzi_de_lucru"),
  valoareContract: text("valoare_contract"),
  plata: text("plata"),
  rata2: text("rata2"),
  rata3: text("rata3"),
  bonus: text("bonus"),
  serviciiSuplimentare: text("servicii_suplimentare"),
  rata2LivrareStructura: text("rata2_livrare_structura"),
  dataApproxLivrare: text("data_approx_livrare"),
  rataFinalaPif: text("rata_finala_pif"),
  judet: text("judet"),
  localitate: text("localitate"),
  detalii: text("detalii"),
  indexNr: text("index_nr"),
  comentariiOperational: text("comentarii_operational"),
  rowColor: varchar("rowColor", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StocReal = typeof stocReal.$inferSelect;
export type InsertStocReal = typeof stocReal.$inferInsert;

/**
 * SERVICII - Post-delivery contract management
 * 24 columns from Excel
 */
export const servicii = mysqlTable("servicii", {
  id: int("id").autoincrement().primaryKey(),
  produs: text("produs"),
  dataControl: text("data_control"),
  vanzator: text("vanzator"),
  status: text("status"),
  cumparator: text("cumparator"),
  raspunsuri: text("raspunsuri"),
  comenziDeLucru: text("comenzi_de_lucru"),
  valoare: text("valoare"),
  plata: text("plata"),
  rata2: text("rata2"),
  rata3: text("rata3"),
  rata4: text("rata4"),
  bonus: text("bonus"),
  serviciiSuplimentare: text("servicii_suplimentare"),
  livrareCfContract: text("livrare_cf_contract"),
  dataMontaj: text("data_montaj"),
  pifCfContract: text("pif_cf_contract"),
  judet: text("judet"),
  localitate: text("localitate"),
  detalii: text("detalii"),
  mentiuni: text("mentiuni"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Servicii = typeof servicii.$inferSelect;
export type InsertServicii = typeof servicii.$inferInsert;

/**
 * INCHISE - Completed contracts archive
 * 5 main columns from Excel
 */
export const inchise = mysqlTable("inchise", {
  id: int("id").autoincrement().primaryKey(),
  client: text("client"),
  produs: text("produs"),
  judet: text("judet"),
  localitate: text("localitate"),
  feedback: text("feedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Inchise = typeof inchise.$inferSelect;
export type InsertInchise = typeof inchise.$inferInsert;

/**
 * SERVICE - Technical interventions and support cases
 * 13 main columns from Excel
 */
export const service = mysqlTable("service", {
  id: int("id").autoincrement().primaryKey(),
  cazNumarul: text("caz_numarul"),
  client: text("client"),
  comandaDeLucru: text("comanda_de_lucru"),
  raspunsuriComenzi: text("raspunsuri_comenzi"),
  produs: text("produs"),
  serie: text("serie"),
  problema: text("problema"),
  dataSesizare: text("data_sesizare"),
  dataReceptie: text("data_receptie"),
  solutionare: text("solutionare"),
  motivGarantie: text("motiv_garantie"),
  dataIesire: text("data_iesire"),
  finalizat: text("finalizat"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Service = typeof service.$inferSelect;
export type InsertService = typeof service.$inferInsert;
