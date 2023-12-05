"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function handleGetColumns(primaryTable: string, row: any): string[] {
  const columns = [];

  for (const field of tableFields[primaryTable as keyof typeof tableFields]) {
    columns.push(row[field.value]);
  }

  return columns;
}

function Row({ row, primaryTable }: { row: any; primaryTable: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {handleGetColumns(primaryTable, row).map(
          (column: any) =>
            column && (
              <TableCell component="th" scope="row">
                {column}
              </TableCell>
            )
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {Object.keys(row).map((key) => {
              if (Array.isArray(row[key]) && row[key].length > 0) {
                return (
                  <Box sx={{ margin: 1 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      style={{ textTransform: "capitalize" }}
                    >
                      {key.split("_").join(" ")}
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          {Object.keys(row[key][0]).map((key2) => (
                            <TableCell>
                              {allLabes.map((label) =>
                                label.value === key2 ? label.label : null
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row[key].map((historyRow: any) => (
                          <TableRow key={historyRow.date}>
                            {Object.keys(historyRow).map((key2) => (
                              <TableCell>{historyRow[key2]}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                );
              }
            })}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.any.isRequired,
  primaryTable: PropTypes.string.isRequired,
};

export default function Modal({
  data,
  showModal,
  setShowModal,
  primaryTable,
}: {
  data: any;
  showModal: boolean;
  setShowModal: Function;
  primaryTable: string;
}) {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white p-5 rounded w-4/6">
        <div className="overflow-y-auto" style={{ maxHeight: "720px" }}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />

                  {tableFields[primaryTable as keyof typeof tableFields].map(
                    (field) =>
                      field &&
                      data[0][field.value] && (
                        <TableCell>{field.label}</TableCell>
                      )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row: any) => (
                  <Row key={row.name} row={row} primaryTable={primaryTable} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded mr-2"
            onClick={() => setShowModal(false)}
          >
            fechar
          </button>
        </div>
      </div>
    </div>
  );
}

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

const allLabes = [
  {
    label: "Identificador",
    value: "id_assunto",
  },
  {
    label: "Nome",
    value: "nome_assunto",
  },
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

  {
    label: "Identificador",
    value: "id_material",
  },
  {
    label: "Material",
    value: "nome_material",
  },

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

  {
    label: "Identificador",
    value: "id_ocupacao",
  },
  {
    label: "Ocupação",
    value: "nome_ocupacao",
  },
];
