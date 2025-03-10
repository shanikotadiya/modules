export default function ExcelMode() {
  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12 col-sm-12 col-lg-8">
            <div className="card p-4 shadow-sm">
              <h5 className="text-center mb-3">Upload Excel File</h5>
              <div className="mb-3">
                <label className="form-label fw-bold">Select Excel File:</label>
                <input type="file" name="excelfile" className="form-control" />
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
