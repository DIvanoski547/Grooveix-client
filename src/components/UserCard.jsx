function UserCard({ firstName, lastName, username }) {
  return (
    <div className="album_card">
      <h4>{username}</h4>
      <p>{firstName}</p>
      <p>{lastName}</p>
    </div>
  );
}

export default UserCard;
