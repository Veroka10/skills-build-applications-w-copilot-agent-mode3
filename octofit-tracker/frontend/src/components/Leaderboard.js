import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', apiEndpoint);
        
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardData = data.results ? data.results : data;
        console.log('Processed leaderboard data:', leaderboardData);
        
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

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
      <h2 className="mb-4">🏆 Leaderboard</h2>
      <div className="card data-card">
        <div className="card-header">
          <strong>Top Performers ({leaderboard.length})</strong>
        </div>
        <div className="card-body p-0">
          {leaderboard.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: '60px' }}>Rank</th>
                    <th>User</th>
                    <th className="text-end">Score</th>
                    <th className="text-end">Points</th>
                    <th className="text-center" style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id}>
                      <td className="text-center">
                        <span className="h5">{getMedalEmoji(index + 1)} {index + 1}</span>
                      </td>
                      <td>
                        <strong>{entry.username || entry.user}</strong>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-success">{entry.score}</span>
                      </td>
                      <td className="text-end">
                        <strong>{entry.points}</strong>
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
              <p>No leaderboard data found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
