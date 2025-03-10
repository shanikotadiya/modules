import Link from "next/link";
export default function page() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          This is index page click link to go for that module
        </h1>
        <table
          border={1}
          width={1000}
          className="table table-bordered w-75 mt-5 text-center"
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Pagination</td>
              <td>
                <Link href="/datatable" className="text-decoration-none">
                  Datatable
                </Link>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Context Module</td>
              <td>
                <Link href="/contextmodule" className="text-decoration-none">
                  ContextModule
                </Link>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Register Module</td>
              <td>
                <Link
                  href="/registrationmodule"
                  className="text-decoration-none"
                >
                  registrationmodule
                </Link>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Login Module</td>
              <td>
                <Link href="/login" className="text-decoration-none">
                  loginmodule
                </Link>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Company Mail Module</td>
              <td>
                <Link href="/companymail" className="text-decoration-none">
                  Company Mail Module
                </Link>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Send Company Mail Module</td>
              <td>
                <Link href="/sendcompanymail" className="text-decoration-none">
                  send mail
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
