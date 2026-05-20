import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <div>
      <h1>Status</h1>
      {isLoading ? (
        "Carregando..."
      ) : (
        <>
          <UpdatedAt updatedAt={data?.updated_at} />
          <Database database={data?.dependencies?.database} />
        </>
      )}
    </div>
  );
}

function UpdatedAt({ updatedAt }) {
  if (!updatedAt) {
    return <div>Sem registros de atualizações.</div>;
  }

  const date = new Date(updatedAt);
  const updatedAtText = date.toLocaleString("pt-BR");

  return (
    <div>
      <p>Última atualização: {updatedAtText}</p>
    </div>
  );
}

function Database({ database }) {
  if (!database) {
    return <div>Nenhum dado encontrado para o Banco de Dados.</div>;
  }

  const maxConnections = database.max_connections;
  const openedConnections = database.opened_connections;
  const version = database.version;

  return (
    <div>
      <h3>
        Banco de Dados:
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <progress
            id="meuSlider"
            value={openedConnections ?? 100}
            max={maxConnections ?? 100}
          ></progress>
        </div>
      </h3>
      <div>Conexões abertas: {openedConnections}</div>
      <div>Máximo de conexões: {maxConnections}</div>
      <div>Versão do banco: {version}</div>
    </div>
  );
}
