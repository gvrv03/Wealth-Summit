import { utils, write } from "xlsx";

const jsonToExcelDownload = (json) => {
  const worksheet = utils.json_to_sheet(json);
  const workbook = {
    Sheets: {
      data: worksheet,
    },
    SheetNames: ["data"],
  };
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "data.xlsx";
  downloadLink.click();
};

export default jsonToExcelDownload;
