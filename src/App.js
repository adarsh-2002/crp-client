import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import Search from './components/Search';
import UpdateStudent from './components/UpdateStudent';
import DeleteStudent from './components/DeleteStudent';

const ROLES = {
  'User': 1232,
  'Admin': 3023
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
            <Route path="editor" element={<AddStudent />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path="students" element={<Lounge />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path="search" element={<Search/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path="update" element={<UpdateStudent/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path="delete" element={<DeleteStudent/>} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;