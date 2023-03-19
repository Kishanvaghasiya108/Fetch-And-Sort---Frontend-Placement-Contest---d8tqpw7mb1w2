import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://content.newtonschool.co/v1/pr/main/users");
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSort = () => {
    setSortAscending(!sortAscending);
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = a.name.length;
      const nameB = b.name.length;
      if (nameA < nameB) {
        return sortAscending ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortAscending ? 1 : -1;
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={() => setIsLoading(true)}>Fetch User Data</button>
      <button className="sort-btn" onClick={handleSort}>
        {sortAscending ? "Sort by name length (ascending)" : "Sort by name length (descending)"}
      </button>
      {isLoading ? <p>Loading...</p> :
        <ul className='users-section'>
          {users.map(user => (
            <li key={user.id}>
              <section className='id-section'>{user.id}</section>
              <section className='name-email-section'>
                <p className='name'>Name: {user.name}</p>
                <p className='email'>Email: {user.email}</p>
              </section>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default App;
