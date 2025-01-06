import { Link } from "react-router-dom";

function Posts(props) {
  return (
    <>
      <h1>Blog Posts</h1>
      <ul className="list-centered">
        <li className="title">Title 1</li>
        <div className="date">Date</div>
        <div className="acceptance">Acceptance rate: ?</div>
        <div>
          <Link to="/post" state={{ postId: 1 }}>
            Read
          </Link>
        </div>
      </ul>
    </>
  );
}

export default Posts;
