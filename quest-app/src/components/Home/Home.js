import React, { useEffect, useState } from "react";
import { Container, styled } from "@mui/material";
import Post from '../Post/Post';
import PostForm from "../Post/PostForm";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f5ff",
  minHeight: "100vh",
  padding: "10px",
  boxSizing: "border-box",
});

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  
  const refreshPosts = () => {
    fetch("/posts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  
  useEffect(() => {
    refreshPosts();
  }, [postList])

  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading ...</div>;
  } else {
    return (
      <div className="container">
        <StyledContainer>
          <PostForm userId={1} userName={"dadd"} refreshPosts={refreshPosts} />
          {postList.map(post => (
            <Post postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text} />
          ))}
        </StyledContainer>
      </div>
    );
  }
}

export default Home;
