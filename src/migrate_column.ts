import sequelizeConnection from "./db/config";

async function run() {
  try {
    console.log("Connecting and altering table lead_applications...");
    await sequelizeConnection.query('ALTER TABLE "lead_applications" ADD COLUMN IF NOT EXISTS "admissionStatus" VARCHAR(255) DEFAULT \'Pending\';');
    console.log("Success! admissionStatus column added/verified.");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await sequelizeConnection.close();
  }
}

run();
