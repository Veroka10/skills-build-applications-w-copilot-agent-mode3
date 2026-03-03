import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', apiEndpoint);
        
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        console.log('Workouts API response:', data);
        
        // Handle both paginated and plain array responses
        const workoutsData = data.results ? data.results : data;
        console.log('Processed workouts data:', workoutsData);
        
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
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
      <h2 className="mb-4">💪 Workouts</h2>
      <div className="card data-card">
        <div className="card-header">
          <strong>Workout Programs ({workouts.length})</strong>
        </div>
        <div className="card-body p-0">
          {workouts.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: '50px' }}>ID</th>
                    <th>Workout Name</th>
                    <th>Description</th>
                    <th className="text-end">Duration (min)</th>
                    <th className="text-center" style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td className="text-center">{workout.id}</td>
                      <td>
                        <strong>{workout.name}</strong>
                      </td>
                      <td>{workout.description}</td>
                      <td className="text-end">
                        <span className="badge bg-warning text-dark">{workout.duration}</span>
                      </td>
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
              <p>No workouts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
