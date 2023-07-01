import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function registrosPDF(entries, exits) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Registros de Entradas e Saídas",
      fontSize: 19,
      bold: true,
      margin: [15, 20, 0, 45],
      alignment: "center",
      style: "header",
    },
  ];

  const entriesDados = entries.map((entry) => {
    return [
      { text: entry.quantity, fontSize: 9, alignment: "center" },
      { text: entry.bloodType, fontSize: 9, alignment: "center" },
      { text: entry.entryType, fontSize: 9, alignment: "center" },
      { text: entry.donator, fontSize: 9, alignment: "center" },
      { text: entry.user.name, fontSize: 9, alignment: "center" },
      {
        text: new Date(entry.createdAt).toLocaleDateString(),
        fontSize: 9,
        alignment: "center",
      },
      {
        text: new Date(entry.createdAt).toLocaleTimeString(),
        fontSize: 9,
        alignment: "center",
      },
      { text: entry.notes, fontSize: 9, alignment: "center" },
    ];
  });

  const exitDados = exits.map((exit) => {
    return [
      { text: exit.quantity, fontSize: 9, alignment: "center" },
      { text: exit.bloodType, fontSize: 9, alignment: "center" },
      { text: exit.exitType, fontSize: 9, alignment: "center" },
      { text: exit.destination, fontSize: 9, alignment: "center" },
      { text: exit.user.name, fontSize: 9, alignment: "center" },
      {
        text: new Date(exit.createdAt).toLocaleDateString(),
        fontSize: 9,
        alignment: "center",
      },
      {
        text: new Date(exit.createdAt).toLocaleTimeString(),
        fontSize: 9,
        alignment: "center",
      },
      { text: exit.notes, fontSize: 9, alignment: "center" },
    ];
  });

  const details = [
    {
      text: "Entradas:",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 20],
      style: "subHeader",
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
        body: [
          [
            {
              text: "Quantidade",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Tipagem",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Razão",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Doador",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Responsável",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Data",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Horário",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Observações",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
          ],
          ...entriesDados,
        ],
      },
      layout: "lightHorizontalLines",
    },
    { text: "", margin: [0, 20, 0, 20] },
    {
      text: "Saídas:",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 20],
      style: "subHeader",
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
        body: [
          [
            {
              text: "Quantidade",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Tipagem",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Razão",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Destino",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Responsável",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Data",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Horário",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
            {
              text: "Observações",
              style: "tableHeader",
              fontSize: 10,
              alignment: "center",
            },
          ],
          ...exitDados,
        ],
      },
      layout: "lightHorizontalLines",
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: "Página " + currentPage + " de " + pageCount,
        alignment: "right",
        fontSize: 10,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const docDefinitios = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitios).open({}, window.open("", "_blank"));
}

export default registrosPDF;
