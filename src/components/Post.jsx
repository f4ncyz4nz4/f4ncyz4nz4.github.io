import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const location = useLocation();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const { postId } = location.state || {}; // Fallback to empty object if state is not found

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/posts/post${postId}.md`); // Adjust path to match your content
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

  if (error) {
    return <Navigate to="/notfound" />;
  }

  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default Post;
