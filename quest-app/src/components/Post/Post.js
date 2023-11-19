import React, { useEffect, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { title, text, userId, userName,postId } = props;
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const {commentList, setCommentList}=useState([]);
  const isInitialMount=useRef(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComment();
    console.log(commentList);
  };

  const handleLike = () => {
    setLiked(!liked);
  };
  const refreshComment = () => {
    fetch("/comments?postId="+postId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  useEffect(() => {
    if(isInitialMount.current)
    isInitialMount.current=false
  else
   refreshComment()
    
  }, [commentList])

  return (
    <div className="postcontainer">
      <Card sx={{ width: 700, textAlign: "left", marginBottom: 2 }}>
        <CardHeader
          avatar={
            <Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none", color: "white", marginRight: "20px" }}>
              User
              <Avatar sx={{  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'}} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={liked ? { color: "red" } : null} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{ padding: '16px' }}>
            {/* Genişletilmiş kart içeriği buraya gelebilir */}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;