import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching users from:', apiEndpoint);
        
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        console.log('Users API response:', data);
        
        // Handle both paginated and plain array responses
        const usersData = data.results ? data.results : data;
        console.log('Processed users data:', usersData);
        
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger alert-container" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">👥 Users</h2>
      <div className="card data-card">
        <div className="card-header">
          <strong>User Directory ({users.length})</strong>
        </div>
        <div className="card-body p-0">
          {users.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: '50px' }}>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th className="text-center" style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="text-center">{user.id}</td>
                      <td>
                        <strong>{user.username}</strong>
                      </td>
                      <td>{user.email}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-primary">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 text-center text-muted">
              <p>No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
