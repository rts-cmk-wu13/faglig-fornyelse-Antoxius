import { NavLink } from 'react-router-dom';
import './ComingSoon.css';

function ComingSoon({ pageName = 'This Page' }) {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1>Coming Soon</h1>
        <p>{pageName} is currently under construction.</p>
        <p>Check back soon for updates!</p>
        <NavLink to="/" className="back-home-link">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}

export default ComingSoon;
