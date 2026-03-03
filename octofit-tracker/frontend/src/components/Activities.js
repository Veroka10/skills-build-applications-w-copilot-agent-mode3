import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', apiEndpoint);
        
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        console.log('Activities API response:', data);
        
        // Handle both paginated and plain array responses
        const activitiesData = data.results ? data.results : data;
        console.log('Processed activities data:', activitiesData);
        
        setActivities(activitiesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
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
      <h2 className="mb-4">🏃 Activities</h2>
      <div className="card data-card">
        <div className="card-header">
          <strong>Activity Log ({activities.length})</strong>
        </div>
        <div className="card-body p-0">
          {activities.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: '50px' }}>ID</th>
                    <th>Activity Type</th>
                    <th>Description</th>
                    <th className="text-end">Duration</th>
                    <th className="text-center" style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="text-center">{activity.id}</td>
                      <td>
                        <span className="badge bg-info">{activity.activity_type}</span>
                      </td>
                      <td>{activity.description}</td>
                      <td className="text-end">
                        <strong>{activity.duration} min</strong>
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
              <p>No activities found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
