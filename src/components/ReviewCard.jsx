function ReviewCard({ username, rating, content }) {
  return (
    <div>
      <h4>{username.username}</h4>
      <p>{rating}/5</p>
      <p>{content}</p>
    </div>
  );
}

export default ReviewCard;
