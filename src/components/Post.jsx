import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const location = useLocation();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const { postId } = location.state || {}; // Check if postId exists

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/posts/post${postId}.md`);
          if (!response.ok) {
            setError(true);
            return;
          }
          const text = await response.text();
          setContent(text);
        } catch (err) {
          setError(true);
        }
      };

      fetchPost();
    }
  }, [postId]);

  if (!postId) {
    // Redirect to /posts if accessed without state
    return <Navigate to="/posts" />;
  }

  if (error) {
    return <Navigate to="/notfound" />;
  }

  return (
    <div className="markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Post;
