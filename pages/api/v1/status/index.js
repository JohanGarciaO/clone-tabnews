import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const serverVersion = await database.query("SHOW server_version;");
  const versionValue = serverVersion.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnections.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const openedConnections = await database.query({
    text: "SELECT count(*)::int as opened_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnectionsValue = openedConnections.rows[0].opened_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: openedConnectionsValue,
        version: versionValue,
      },
    },
  });
}

export default status;
