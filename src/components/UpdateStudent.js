import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UpdateStudent = () => {
  const userRef = useRef();
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [clas, setClas] = useState("");
  const [semester, setSemester] = useState("");
  const [graduationYear, setGradYr] = useState("");
  const [dept, setDept] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put("/students", {
        firstname,
        lastname,
        rollNo,
        class: clas,
        dept,
        graduationYear,
        semester,
        subject,
        marks
      }, () => {console.log(response.data)});
      console.log(response.data);
      console.log(JSON.stringify(response?.data));
      setErrMsg("Matched " + response?.data.matchedCount + " Records and Updated " + response?.data.modifiedCount + " Records")
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Student already exists");
      } else {
        setErrMsg("Adding student Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <p>
            <Link to="/students">View Students</Link>
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
          <h1>Update Student Records</h1>
          <h4>NOTE: All fields are optional except marks. All the matched records will be updated.</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">Firstname:</label>
            <input
              type="text"
              id="firstname"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />

            <label htmlFor="lastname">Lastname:</label>
            <input
              type="text"
              id="lastname"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />

            <label htmlFor="rollNo">Roll number:</label>
            <input
              type="text"
              id="rollNo"
              onChange={(e) => setRollNo(e.target.value)}
              value={rollNo}
            />

            <label htmlFor="class">Class:</label>
            <input
              type="text"
              id="clas"
              onChange={(e) => setClas(e.target.value)}
              value={clas}
            />

            <label htmlFor="dept">Department:</label>
            <input
              type="text"
              id="dept"
              onChange={(e) => setDept(e.target.value)}
              value={dept}
            />

            <label htmlFor="graduationYear">Graduation year:</label>
            <input
              type="text"
              id="graduationYear"
              onChange={(e) => setGradYr(e.target.value)}
              value={graduationYear}
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

            <label htmlFor="marks">Marks:</label>
            <input
              type="text"
              id="marks"
              onChange={(e) => setMarks(e.target.value)}
              value={marks}
              required
            />

            <button>Update records</button>
          </form>
          <p>
            Go back
            <br />
            <span className="line">
              <Link to="/linkpage">Link</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default UpdateStudent;
