import * as XLSX from "xlsx";
export const readExcel = async (file: Blob) => {
  const reader = new FileReader();
  reader.readAsBinaryString(file);

  const dataFromSheet:Promise<any> = new Promise((resolve, reject) => {
    reader.onload = (evt) => {
      const fileData = evt.target?.result;
      if (fileData) {
        const wb = XLSX.read(fileData, { type: "binary" });
        /* Get first worksheet */

        const wsname = wb.SheetNames[0];
        const sheet = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(sheet);
        /* Update state */
        resolve(data);
      }
    };
  });

  return dataFromSheet;
};
