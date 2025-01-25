import { Link } from "react-router-dom";

function Posts(props) {
  const posts = [
    {
      id: 1,
      title: "Gozi String Decryption",
      date: "2023-01-01",
      description: "bla bla bla",
    },
    // { id: 2, title: "Title 2", date: "2023-02-15", description: "75%" },
    // { id: 3, title: "Title 3", date: "2023-03-10", description: "90%" },
  ];

  return (
    <>
      <h1>Blog Posts</h1>
      <ul className="list-centered">
        {posts.reverse().map((post) => (
          <li key={post.id} className="post-item">
            <div className="title">
              <Link to="/post" state={{ postId: post.id }}>
                {post.title}
              </Link>
            </div>
            <div className="date">{post.date}</div>
            <div className="description">{post.description}</div>
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Posts;
