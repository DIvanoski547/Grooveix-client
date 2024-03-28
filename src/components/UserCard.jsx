function UserCard({ profileImage, firstName, lastName, username }) {
  return (
    <div className="album_card">
      <h4>{username}</h4>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <img src={profileImage} style={{ width: 100 }} />
    </div>
  );
}

export default UserCard;
