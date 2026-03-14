import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";
import { execSync } from "child_process";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

// Extract data from Excel using Python
const jsonData = execSync(
  `python3 -c "
import openpyxl
import json

wb = openpyxl.load_workbook('/home/ubuntu/upload/ZEUS_TaskControl.xlsx', data_only=True)
result = {}

# STOC REAL
ws = wb['STOC REAL']
rows = []
for row in range(2, ws.max_row + 1):
    vals = []
    for col in range(1, 25):
        v = ws.cell(row=row, column=col).value
        if v is None:
            vals.append(None)
        else:
            vals.append(str(v))
    if any(v is not None for v in vals):
        rows.append(vals)
result['stoc_real'] = rows

# SERVICII
ws = wb['SERVICII']
rows = []
for row in range(2, ws.max_row + 1):
    vals = []
    for col in range(1, 25):
        v = ws.cell(row=row, column=col).value
        if v is None:
            vals.append(None)
        else:
            vals.append(str(v))
    if any(v is not None for v in vals):
        rows.append(vals)
result['servicii'] = rows

# INCHISE
ws = wb['INCHISE']
rows = []
for row in range(2, ws.max_row + 1):
    vals = []
    for col in range(1, 6):
        v = ws.cell(row=row, column=col).value
        if v is None:
            vals.append(None)
        else:
            vals.append(str(v))
    if any(v is not None for v in vals):
        rows.append(vals)
result['inchise'] = rows

# SERVICE
ws = wb['SERVICE']
rows = []
for row in range(2, ws.max_row + 1):
    vals = []
    for col in range(1, 14):
        v = ws.cell(row=row, column=col).value
        if v is None:
            vals.append(None)
        else:
            vals.append(str(v))
    if any(v is not None for v in vals):
        rows.append(vals)
result['service'] = rows

print(json.dumps(result))
"`,
  { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 }
);

const data = JSON.parse(jsonData);

console.log("Parsed data:");
console.log("  STOC REAL:", data.stoc_real.length, "rows");
console.log("  SERVICII:", data.servicii.length, "rows");
console.log("  INCHISE:", data.inchise.length, "rows");
console.log("  SERVICE:", data.service.length, "rows");

const connection = await mysql.createConnection(dbUrl);

try {
  await connection.execute("DELETE FROM stoc_real");
  await connection.execute("DELETE FROM servicii");
  await connection.execute("DELETE FROM inchise");
  await connection.execute("DELETE FROM service");

  console.log("\\nImporting STOC REAL...");
  let count = 0;
  for (const row of data.stoc_real) {
    await connection.execute(
      "INSERT INTO stoc_real (produs, de_comandat, disponibil_vanzare, vanzator, status, cumparator, raspunsuri_vanzatori, comenzi_de_lucru, valoare_contract, plata, rata2, rata3, bonus, servicii_suplimentare, rata2_livrare_structura, data_approx_livrare, rata_finala_pif, judet, localitate, detalii, index_nr, comentarii_operational) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18], row[19], row[20], row[21]]
    );
    count++;
  }
  console.log("  Inserted", count, "rows");

  console.log("Importing SERVICII...");
  count = 0;
  for (const row of data.servicii) {
    await connection.execute(
      "INSERT INTO servicii (produs, data_control, vanzator, status, cumparator, raspunsuri, comenzi_de_lucru, valoare, plata, rata2, rata3, rata4, bonus, servicii_suplimentare, livrare_cf_contract, data_montaj, pif_cf_contract, judet, localitate, detalii, mentiuni) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18], row[19], row[20]]
    );
    count++;
  }
  console.log("  Inserted", count, "rows");

  console.log("Importing INCHISE...");
  count = 0;
  for (const row of data.inchise) {
    await connection.execute(
      "INSERT INTO inchise (client, produs, judet, localitate, feedback) VALUES (?, ?, ?, ?, ?)",
      [row[0], row[1], row[2], row[3], row[4]]
    );
    count++;
  }
  console.log("  Inserted", count, "rows");

  console.log("Importing SERVICE...");
  count = 0;
  for (const row of data.service) {
    await connection.execute(
      "INSERT INTO service (caz_numarul, client, comanda_de_lucru, raspunsuri_comenzi, produs, serie, problema, data_sesizare, data_receptie, solutionare, motiv_garantie, data_iesire, finalizat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12]]
    );
    count++;
  }
  console.log("  Inserted", count, "rows");

  console.log("\\n✅ All data imported successfully!");
} catch (err) {
  console.error("Import error:", err.message);
  process.exit(1);
} finally {
  await connection.end();
}
