import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Search = () => {
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [rollNo, setRollNo] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [semester, setSemester] = useState(null);
  const [subject, setSubject] = useState(null);
  const [dept, setDept] = useState(null);
  const [clas, setClas] = useState(null);
  const [records, setRecords] = useState(null);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(records)
  }, [records])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params =  {
        "rollNo":rollNo,
        "firstname":firstname,
        "lastname":lastname,
        "semester":semester,
        "subject":subject,
        "dept":dept,
        "class":clas
      }
      console.log(params);
      const response = await axiosPrivate.get("/students/search", {params});
      console.log(JSON.stringify(response?.data));
      setRecords(response.data);
      console.log(records);
      setSuccess(true);
      //console.log(JSON.stringify(response))

      //clear state and controlled inputs
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Student not found");
      } else {
        setErrMsg("Student not found");
      }
    }
  };

  return (
    <>
      {success ? (
        <section className="section-body">
          <h1>Success!</h1>
          <table>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>Department</th>
                <th>Graduation Year</th>
                <th>Semester</th>
                <th>Subjects</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {records?.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.firstname}</td>
                    <td>{val.lastname}</td>
                    <td>{val.rollNo}</td>
                    <td>{val.class}</td>
                    <td>{val.dept}</td>
                    <td>{val.graduationYear}</td>
                    <td>{val.semester}</td>
                    <td>{val.subject}</td>
                    <td>{val.marks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>
            <Link to="/linkpage">Go back</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Search Student</h1>
          <h4>NOTE: All fields are optional. Empty form returns all records.</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="rollNo">Roll number:</label>
            <input
              type="text"
              id="rollNo"
              onChange={(e) => setRollNo(e.target.value)}
              value={rollNo}
            />

            <label htmlFor="firstname">Firstname:</label>
            <input
              type="text"
              id="firstname"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />

            <label htmlFor="lastname">Last name:</label>
            <input
              type="text"
              id="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
            
            <label htmlFor="semester">Semester:</label>
            <input
              type="text"
              id="semester"
              onChange={(e) => setSemester(e.target.value)}
              value={semester}
            />

            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />

            <label htmlFor="dept">Department:</label>
            <input
              type="text"
              id="dept"
              onChange={(e) => setDept(e.target.value)}
              value={dept}
            />
            
            <label htmlFor="clas">Class:</label>
            <input
              type="text"
              id="clas"
              onChange={(e) => setClas(e.target.value)}
              value={clas}
            />
            <button>Search Student</button>
          </form>
          <p>
            Go back
            <br />
            <span className="line">
              <Link to="/linkpage">Link page</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Search;
