import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Lounge = () => {
  const [students, setStudents] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getStudents = async () => {
      try {
        const response = await axiosPrivate.get("/students", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setStudents(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getStudents();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <article>
      <h2>Students List</h2>
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
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((val, key) => {
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
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </article>
  );
};

export default Lounge;
