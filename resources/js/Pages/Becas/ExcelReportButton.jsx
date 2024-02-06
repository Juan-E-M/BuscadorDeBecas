import React from "react";
import ExcelJS from "exceljs";

const ExcelReportButton = ({ data }) => {
    const generateReport = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Becas Report");

        // Agrega encabezados
        worksheet.addRow([
            "ID",
            "Nombre",
            "Institución",
            "Resumen",
            "Tipo de beca",
            "Obligatoriedad",
            "País",
            "Región",
            "Fecha de Inicio",
            "Fecha de Fin",
            "Estado",
            "Link",
            "Descarga",
            "Otros",
            "OCDE",
            "ODS",
            "CRL",
            "TRL",
        ]);

        // Agrega datos
        data.forEach((item) => {
            const ocdeNames = item.ocde.map(
                (ocde) => `${ocde.code} - ${ocde.name}`
            );
            const odsNames = item.ods.map(
                (ods) => `${ods.name} - ${ods.description}`
            );

            worksheet.addRow([
                item.id,
                item.name,
                item.institution,
                item.summary,
                item.type,
                item.obligation,
                item.country.name,
                item.region,
                item.start_date,
                item.end_date,
                item.status ? "vigente" : "no vigente",
                item.link,
                item.file_path,
                item.others,
                ocdeNames.join(", "), 
                odsNames.join(", "),
                `${item.crl.name}-${item.crl.description}`,
                `${item.trl.name}-${item.trl.description}`,
            ]);
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "ReporteBecas.xlsx";
            a.click();
        });
    };

    return (
        <button
            onClick={generateReport}
            className="rounded-md bg-green-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 mr-3"
        >
            Reporte
        </button>
    );
};

export default ExcelReportButton;
