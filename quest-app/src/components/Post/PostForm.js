
import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link } from 'react-router-dom';

const useStyles = styled((theme) => ({
  avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    
  },
  // Diğer stil tanımlamalarını buraya ekleyebilirsiniz.
}));

const PostForm = (props) => {
  const { userId, userName, refreshPosts } = props;
  const classes = useStyles();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);

  
  const savePost = () => {
    fetch("/posts", {
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify({
      title:title,
      userId:userId,
      text:text,

      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"))
    }
  
    const handleSubmit = () => {
      savePost();
      setIsSent(true);
      setTitle("");
      setText("");
      refreshPosts();
 }

 const handleTitle = (value) => {
     setTitle(value);
     setIsSent(false);
 }
 
 const handleText = (value) => {
     setText(value);
     setIsSent(false);
 }

  return (

    <div className="postcontainer">
      <Card sx={{ width: 700, textAlign: "left", margin: 2 }}>
        <CardHeader
          avatar={
            <Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>
              User
              <Avatar className={classes.avatar} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={<OutlinedInput
            id="outlined-adorment-amount"
            multiline
            placeholder="title"
            inputProps={{ maxLenght: 40 }}
            fullWidth
            value={title}
            onChange={(i) => handleTitle(i.target.value)}
          />}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <OutlinedInput
              id="outlined-adorment-amount"
              multiline
              placeholder="text"
              inputProps={{ maxLenght: 250 }}
              fullWidth
              value={text}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained" endIcon={<SendIcon />}
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                </InputAdornment>
              }
            />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostForm;