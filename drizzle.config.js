/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_JBs7P0FueDGY@ep-withered-mouse-a8iahzbq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'    }
  };