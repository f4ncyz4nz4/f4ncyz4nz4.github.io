import { Link } from "react-router-dom";

function Posts(props) {
  const posts = [
    {
      id: "gozi_string_decryptor",
      title: "Gozi String Decryption - Zero2Automated",
      date: "2025-01-25",
      description:
        "The Gozi String Decryptor challenge in the Zero2Automated course involves reverse engineering the string decryption function of the Gozi malware and replicating it in Python.",
    },
    // { id: 2, title: "Title 2", date: "2023-02-15", description: "description" },
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
