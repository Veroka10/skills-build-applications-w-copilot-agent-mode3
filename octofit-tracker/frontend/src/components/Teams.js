import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', apiEndpoint);
        
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        console.log('Teams API response:', data);
        
        // Handle both paginated and plain array responses
        const teamsData = data.results ? data.results : data;
        console.log('Processed teams data:', teamsData);
        
        setTeams(teamsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
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
      <h2 className="mb-4">⚡ Teams</h2>
      <div className="card data-card">
        <div className="card-header">
          <strong>Team List ({teams.length})</strong>
        </div>
        <div className="card-body p-0">
          {teams.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: '50px' }}>ID</th>
                    <th>Team Name</th>
                    <th>Description</th>
                    <th className="text-center" style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td className="text-center">{team.id}</td>
                      <td>
                        <strong>{team.name}</strong>
                      </td>
                      <td>{team.description}</td>
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
              <p>No teams found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
