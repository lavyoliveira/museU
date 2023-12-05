import { useEffect, useState } from "react";
import {
  IReport,
  IField,
  EFilterType,
  ESort,
  ETableNames,
} from "../../interfaces/IReport";
import getReport from "@/services/getReport";
import Modal from "./modal";

export default function Form() {
  const [report, setReport] = useState<IReport>({
    primaryTable: null,
    linkedTables: [],
  });
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportResult, setReportResult] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(report);
  }, [report]);

  const handleGenerateReport = () => {
    setLoading(true);
    console.log(JSON.stringify(report));

    getReport(report)
      .then((res) => {
        console.log(res);
        setLoading(false);

        if (res.length === 0) {
          alert("Nenhum registro encontrado");
          return;
        }

        const newResult = res;

        res.forEach((row: any) => {
          Object.keys(row).forEach((key: any) => {
            if (row[key].length == 0) {
              delete row[key];
            }
          });
        });

        console.log(newResult);
        setReportResult(newResult);

        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Ocorreu um erro ao gerar o relatório");
      });
  };

  return (
    <div className="bg-white pt-4 pb-8 pl-8 pr-8 mx-auto my-8 w-8/12 rounded-md">
      <h2 className="mb-6 text-center">
        utilize as opções abaixo para gerar relatório
      </h2>
      <div className="flex">
        <div className="w-1/3 pr-8">
          <div className="mb-4">
            <label
              htmlFor="fonte-dados"
              className="block text-sm font-semibold mb-2"
            >
              fonte de dados
            </label>
            <select
              id="fonte-dados"
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={(e) => {
                const table = e.target.value;

                setReport({
                  ...report,
                  primaryTable: {
                    name: table as ETableNames,
                    fields: [],
                  },
                  linkedTables: [],
                });

                setReload(true);

                setTimeout(() => {
                  setReload(false);
                }, 100);
              }}
            >
              <option disabled selected hidden className="text-gray-500">
                Selecione uma fonte de dados
              </option>
              {Object.keys(tables).map((table) => (
                <option value={table}>
                  {tables[table as ETableNames].name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-8 md:mb-0">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                conexões
              </label>
              <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
                <div className="flex flex-col">
                  {!report.primaryTable?.name && (
                    <p className="text-sm font-normal">
                      Selecione uma fonte de dados para adicionar conexões
                    </p>
                  )}
                  {!reload &&
                    report.primaryTable?.name &&
                    tables[report.primaryTable.name].relations.map(
                      (relation) => (
                        <div className="flex items-center mb-2 last:mb-0">
                          <input
                            type="checkbox"
                            id={`conexao-${relation}` as ETableNames}
                            className="mr-2"
                            value={relation}
                            onChange={(e) => {
                              const checked = e.target.checked;

                              if (checked) {
                                setReport({
                                  ...report,
                                  linkedTables: [
                                    ...report.linkedTables,
                                    {
                                      name: relation as ETableNames,
                                      fields: [],
                                    },
                                  ],
                                });
                              } else {
                                setReport({
                                  ...report,
                                  linkedTables: report.linkedTables.filter(
                                    (table) => table.name !== relation
                                  ),
                                });
                              }
                            }}
                          />
                          <label
                            htmlFor={`conexao-${relation}`}
                            className="mr-4 text-sm"
                          >
                            {tables[relation as ETableNames].name}
                          </label>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <p className="block text-sm font-semibold mb-2">ordenação</p>

            {!report.primaryTable?.name && (
              <p className="text-sm font-normal">
                Selecione uma fonte de dados para adicionar ordenação
              </p>
            )}

            {!reload &&
              report.primaryTable?.name &&
              report.primaryTable?.fields.length > 0 && (
                <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
                  <p className="mb-2 text-sm font-semibold">
                    {tables[report.primaryTable.name].name} -{" "}
                    {report.primaryTable.fields.length} campos
                  </p>
                  {report.primaryTable?.fields.map((field) => (
                    <div className="flex items-center justify-between mb-2 last:mb-0">
                      <label
                        htmlFor={`ordenacao-${field.name}` as ETableNames}
                        className="mr-4 text-sm"
                      >
                        {
                          tableFields[report.primaryTable!.name].find(
                            (f) => f.value === field.name
                          )?.label
                        }
                      </label>
                      <select
                        id={`ordenacao-${field.name}` as ETableNames}
                        className="bg-white-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2"
                        value={field.sort}
                        onChange={(e) => {
                          const value = e.target.value;

                          setReport({
                            ...report,
                            primaryTable: {
                              ...report.primaryTable!,
                              fields: report.primaryTable!.fields.map((f) => ({
                                ...f,
                                sort:
                                  f.name === field.name
                                    ? (value as ESort)
                                    : null,
                              })) as IField[],
                            },
                          });
                        }}
                      >
                        <option>-</option>
                        <option value={ESort.ASC}>ASC</option>
                        <option value={ESort.DESC}>DESC</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}

            {!reload &&
              report.linkedTables.length > 0 &&
              report.linkedTables.map((table) => (
                <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
                  <p className="mb-2 text-sm font-semibold">
                    {tables[table.name].name} - {table.fields.length} campos
                  </p>
                  {table.fields.map((field) => (
                    <div className="flex items-center justify-between mb-2 last:mb-0">
                      <label
                        htmlFor={`ordenacao-${field.name}` as ETableNames}
                        className="mr-4 text-sm"
                      >
                        {
                          tableFields[table.name].find(
                            (f) => f.value === field.name
                          )?.label
                        }
                      </label>
                      <select
                        id={`ordenacao-${field.name}` as ETableNames}
                        className="bg-white-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2"
                        value={field.sort}
                        onChange={(e) => {
                          const value = e.target.value;

                          setReport({
                            ...report,
                            linkedTables: report.linkedTables.map((t) =>
                              t.name === table.name
                                ? {
                                    ...t,
                                    fields: t.fields.map((f) => ({
                                      ...f,
                                      sort:
                                        f.name === field.name
                                          ? (value as ESort)
                                          : null,
                                    })) as IField[],
                                  }
                                : t
                            ),
                          });
                        }}
                      >
                        <option>-</option>
                        <option value={ESort.ASC}>ASC</option>
                        <option value={ESort.DESC}>DESC</option>
                      </select>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <div className="w-1/3 pr-8">
          <label className="block text-sm font-semibold mb-2">campos</label>
          <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
            <div className="flex flex-col">
              {!report.primaryTable?.name && (
                <p className="text-sm font-normal">
                  Selecione uma fonte de dados para adicionar campos
                </p>
              )}
              {!reload && report.primaryTable?.name && (
                <p className="mb-2 text-sm font-semibold">
                  {tables[report.primaryTable.name].name}
                </p>
              )}
              {!reload &&
                report.primaryTable?.name &&
                tableFields[report.primaryTable.name].map((field) => (
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`campos-${report.primaryTable?.name}-${field.value}`}
                      className="mr-2"
                      value={field.value}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        if (checked) {
                          setReport({
                            ...report,
                            primaryTable: {
                              name: report.primaryTable!.name,
                              ...report.primaryTable,
                              fields: [
                                ...report.primaryTable!.fields,
                                {
                                  name: field.value,
                                },
                              ],
                            },
                          });
                        } else {
                          setReport({
                            ...report,
                            primaryTable: {
                              name: report.primaryTable!.name,
                              ...report.primaryTable,
                              fields: report.primaryTable!.fields.filter(
                                (f) => f.name !== field.value
                              ),
                            },
                          });
                        }
                      }}
                    />
                    <label
                      htmlFor={`campos-${report.primaryTable?.name}-${field.value}`}
                      className="mr-4 text-sm"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}

              {!reload &&
                report.linkedTables.map((table) => (
                  <>
                    <p className="mb-2 text-sm font-semibold">
                      {tables[table.name].name}
                    </p>
                    {tableFields[table.name].map((field) => (
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`campos-${table.name}-${field.value}`}
                          className="mr-2"
                          value={field.value}
                          onChange={(e) => {
                            const checked = e.target.checked;

                            if (checked) {
                              setReport({
                                ...report,
                                linkedTables: report.linkedTables.map((t) =>
                                  t.name === table.name
                                    ? {
                                        ...t,
                                        fields: [
                                          ...t.fields,
                                          { name: field.value },
                                        ],
                                      }
                                    : t
                                ),
                              });
                            } else {
                              setReport({
                                ...report,
                                linkedTables: report.linkedTables.map((t) =>
                                  t.name === table.name
                                    ? {
                                        ...t,
                                        fields: t.fields.filter(
                                          (f) => f.name !== field.value
                                        ),
                                      }
                                    : t
                                ),
                              });
                            }
                          }}
                        />
                        <label
                          htmlFor={`campos-${table.name}-${field.value}`}
                          className="mr-4 text-sm"
                        >
                          {field.label}
                        </label>
                      </div>
                    ))}
                  </>
                ))}
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col gap-2">
          <label className="block text-sm font-semibold mb-2">filtros</label>

          {!report.primaryTable?.name && (
            <p className="text-sm font-normal">
              Selecione uma fonte de dados para adicionar filtros
            </p>
          )}

          {!reload && report.primaryTable?.name && (
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
              <div className="flex flex-col">
                {!reload && report.primaryTable?.name && (
                  <p className="text-sm font-semibold mb-3">
                    {tables[report.primaryTable.name].name}
                  </p>
                )}

                {report.primaryTable?.fields.map((field) => (
                  <div className="flex items-center mb-2 last:mb-0">
                    <label
                      htmlFor={`filtro-${report.primaryTable?.name}-${field.name}`}
                      className="text-sm mr-auto"
                    >
                      {
                        tableFields[report.primaryTable!.name].find(
                          (f) => f.value === field.name
                        )?.label
                      }
                    </label>

                    <select
                      id={`filtro-${report.primaryTable?.name}-${field.name}`}
                      className="bg-white-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2"
                      value={field.filter ? field.filter.type : "-"}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value !== "-") {
                          setReport({
                            ...report,
                            primaryTable: {
                              ...report.primaryTable!,
                              fields: report.primaryTable!.fields.map((f) => ({
                                ...f,
                                filter:
                                  f.name === field.name
                                    ? {
                                        type: value as EFilterType,
                                        value: "",
                                      }
                                    : null,
                              })) as IField[],
                            },
                          });
                        } else {
                          setReport({
                            ...report,
                            primaryTable: {
                              ...report.primaryTable!,
                              fields: report.primaryTable!.fields.map((f) => ({
                                ...f,
                                filter: f.name === field.name ? null : f.filter,
                              })) as IField[],
                            },
                          });
                        }
                      }}
                    >
                      <option>-</option>
                      <option value={EFilterType.EQUALS}>Igual</option>
                      <option value={EFilterType.GT}>Maior que</option>
                      <option value={EFilterType.LT}>Menor que</option>
                      <option value={EFilterType.CONTAINS}>Contém</option>
                    </select>

                    {field.filter?.type && (
                      <input
                        type="text"
                        className="bg-white-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2 ml-2"
                        value={field.filter?.value}
                        onChange={(e) => {
                          const value = e.target.value;

                          setReport({
                            ...report,
                            primaryTable: {
                              ...report.primaryTable!,
                              fields: report.primaryTable!.fields.map((f) => ({
                                ...f,
                                filter:
                                  f.name === field.name
                                    ? {
                                        ...f.filter!,
                                        value,
                                      }
                                    : f.filter,
                              })) as IField[],
                            },
                          });
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!reload &&
            report.linkedTables.length > 0 &&
            report.linkedTables.map((table) => (
              <div className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {tables[table.name].name}
                  </p>

                  {table.fields.map((field) => (
                    <div className="flex items-center justify-between mb-2 last:mb-0">
                      <label
                        htmlFor={`filtro-${table.name}-${field.name}`}
                        className="mr-auto text-sm"
                      >
                        {
                          tableFields[table.name].find(
                            (f) => f.value === field.name
                          )?.label
                        }
                      </label>

                      <select
                        id={`filtro-${table.name}-${field.name}`}
                        className="bg-white-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2"
                        value={field.filter ? field.filter.type : "-"}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (value !== "-") {
                            setReport({
                              ...report,
                              linkedTables: report.linkedTables.map((t) =>
                                t.name === table.name
                                  ? {
                                      ...t,
                                      fields: t.fields.map((f) => ({
                                        ...f,
                                        filter:
                                          f.name === field.name
                                            ? {
                                                type: value as EFilterType,
                                                value: "",
                                              }
                                            : null,
                                      })) as IField[],
                                    }
                                  : t
                              ),
                            });
                          } else {
                            setReport({
                              ...report,
                              linkedTables: report.linkedTables.map((t) =>
                                t.name === table.name
                                  ? {
                                      ...t,
                                      fields: t.fields.map((f) => ({
                                        ...f,
                                        filter:
                                          f.name === field.name
                                            ? null
                                            : f.filter,
                                      })) as IField[],
                                    }
                                  : t
                              ),
                            });
                          }
                        }}
                      >
                        <option>-</option>
                        <option value={EFilterType.EQUALS}>Igual</option>
                        <option value={EFilterType.GT}>Maior que</option>
                        <option value={EFilterType.LT}>Menor que</option>
                        <option value={EFilterType.CONTAINS}>Contém</option>
                      </select>

                      {table.fields.find((f) => f.name === field.name)?.filter
                        ?.type && (
                        <input
                          type="text"
                          className="bg-white-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2 ml-2"
                          value={
                            table.fields.find((f) => f.name === field.name)
                              ?.filter?.value
                          }
                          onChange={(e) => {
                            const value = e.target.value;

                            setReport({
                              ...report,
                              linkedTables: report.linkedTables.map((t) =>
                                t.name === table.name
                                  ? {
                                      ...t,
                                      fields: t.fields.map((f) => ({
                                        ...f,
                                        filter:
                                          f.name === field.name
                                            ? {
                                                ...f.filter!,
                                                value,
                                              }
                                            : f.filter,
                                      })) as IField[],
                                    }
                                  : t
                              ),
                            });
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      {!reload && report.primaryTable?.name && (
        <div className="flex justify-center mt-8">
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
            onClick={handleGenerateReport}
            disabled={loading}
          >
            {loading ? "Gerando relatório..." : "Gerar relatório"}
          </button>
        </div>
      )}
      {showModal && (
        <Modal
          data={reportResult}
          showModal={showModal}
          setShowModal={setShowModal}
          primaryTable={report.primaryTable!.name}
        />
      )}
    </div>
  );
}

const tables = {
  assunto: {
    name: "Assunto",
    relations: ["obra"],
  },
  autor: {
    name: "Autor",
    relations: ["obra"],
  },
  material: {
    name: "Material",
    relations: ["obra"],
  },
  obra: {
    name: "Obra",
    relations: ["autor", "assunto", "material"],
  },
  ocupacao: {
    name: "Ocupação",
    relations: ["autor"],
  },
};

const tableFields = {
  assunto: [
    {
      label: "Identificador",
      value: "id_assunto",
    },
    {
      label: "Nome",
      value: "nome_assunto",
    },
  ],
  autor: [
    {
      label: "Identificador",
      value: "id_autor",
    },
    {
      label: "Nome",
      value: "nome",
    },
    {
      label: "Nacionalidade",
      value: "nacionalidade",
    },
    {
      label: "Ano de Nascimento",
      value: "ano_nascimento",
    },
    {
      label: "Local de Nascimento",
      value: "local_nascimento",
    },
    {
      label: "Ano de Morte",
      value: "ano_morte",
    },
    {
      label: "Local de Morte",
      value: "local_morte",
    },
  ],
  material: [
    {
      label: "Identificador",
      value: "id_material",
    },
    {
      label: "Material",
      value: "nome_material",
    },
  ],
  obra: [
    {
      label: "Identificador",
      value: "num_objeto",
    },
    {
      label: "Nome",
      value: "nome",
    },
    {
      label: "Técnica",
      value: "tecnica",
    },
    {
      label: "Tipo",
      value: "tipo",
    },
    {
      label: "Descrição",
      value: "descricao",
    },
  ],
  ocupacao: [
    {
      label: "Identificador",
      value: "id_ocupacao",
    },
    {
      label: "Ocupação",
      value: "nome_ocupacao",
    },
  ],
};
