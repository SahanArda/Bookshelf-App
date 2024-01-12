import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the stored token (or perform any other necessary cleanup)
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Other content of the Home page */}
    </div>
  );
};

export default Home;
