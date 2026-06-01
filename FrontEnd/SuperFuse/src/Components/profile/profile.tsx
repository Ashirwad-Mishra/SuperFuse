import React from 'react';
import AuthForms from '../AuthForms/AuthForms';

interface ProfileProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const UserProfileDetails: React.FC = () => {
  const userProfile = {
    name: 'Ashirwad Mishra',
    email: 'test@example.com',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    address: '123 Super App Lane, Mumbai, MH 400001',
    preferredPayment: 'Super Payment Wallet',
    purchaseHistory: [
      { id: 1, item: 'Movie Ticket: "Space Odyssey 2"', date: '2025-08-05', price: 'Rs 450' },
      { id: 2, item: 'Home Cleaning Service', date: '2025-08-02', price: 'Rs 1200' },
    ],
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={userProfile.profilePic} alt="User Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>{userProfile.name}</h2>
          <p>{userProfile.email}</p>
          <p>{userProfile.address}</p>
          <p>{userProfile.preferredPayment}</p>
        </div>
      </div>
      <div className="profile-history">
        {userProfile.purchaseHistory.map((entry) => (
          <div key={entry.id}>
            <span>{entry.item}</span>
            <span>{entry.date}</span>
            <strong>{entry.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

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
