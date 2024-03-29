function UserCard({ profileImage, firstName, lastName, username }) {
  return (
    <div className="album_card">
      <img src={profileImage} style={{ width: 100 }} />
      <h4>{username}</h4>
      <p>{firstName}</p>
      <p>{lastName}</p>
    </div>
  );
}

export default UserCard;
