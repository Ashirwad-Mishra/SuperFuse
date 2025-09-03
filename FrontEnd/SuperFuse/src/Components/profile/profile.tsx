import React from 'react';
// import './Profile.css';
import AuthForms from '../AuthForms/AuthForms';

// --- THIS IS THE FIX ---
// The interface now includes the setIsLoggedIn function.
interface ProfileProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const UserProfileDetails: React.FC = () => {
  // This component shows the user's details when they are logged in.
  const userProfile = {
    name: 'Ashirwad Mishra',
    email: 'test@example.com',
    profilePic: 'https://placehold.co/150x150/E84393/FFFFFF?text=A',
    address: '123 Super App Lane, Mumbai, MH 400001',
    preferredPayment: 'Super Payment Wallet',
    purchaseHistory: [
      { id: 1, item: 'Movie Ticket: "Space Odyssey 2"', date: '2025-08-05', price: '₹450' },
      { id: 2, item: 'Home Cleaning Service', date: '2025-08-02', price: '₹1200' },
    ]
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={userProfile.profilePic} alt="User Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>{userProfile.name}</h2>
          <p>{userProfile.email}</p>
        </div>
      </div>
      {/* The rest of your profile details would go here */}
    </div>
  );
};

// The Profile component now accepts and passes down the setIsLoggedIn function.
const Profile: React.FC<ProfileProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="profile-page-container">
      {isLoggedIn ? (
        <UserProfileDetails />
      ) : (
        <AuthForms setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default Profile;