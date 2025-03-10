import * as XLSX from "xlsx";
import { useState } from "react";
export default function ExcelMode() {
  const [data, setData] = useState([]);
  console.log(data);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, { type: "binary" });
        
        // Read the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convert sheet to JSON
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        setData(parsedData);
      };

      reader.readAsBinaryString(file);
    }
  };
  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12 col-sm-12 col-lg-8">
            <div className="card p-4 shadow-sm">
              <h5 className="text-center mb-3">Upload Excel File</h5>
              <div className="mb-3">
                <label className="form-label fw-bold">Select Excel File:</label>
                <input type="file" name="excelfile" className="form-control" onChange={handleFileUpload} />
              </div>
              <div className="text-center">
                <button className="btn btn-primary">Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
