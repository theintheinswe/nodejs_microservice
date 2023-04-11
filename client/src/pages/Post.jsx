import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchStart, fetchSuccess, fetchFailure, like, unlike , dislike, undislike} from "../redux/postSlice";
import { format } from "timeago.js";
import { GetData, PostData } from '../utils/api';

const Container = styled.div`
  display: flex; 
  justify-context:center;
  align-items: center;
`;

const Content = styled.div`
 
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.h3`
  font-size: 16px;
  font-weight: 300;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const ImgFrame = styled.div`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Post = () => {
  const { currentUser } = useSelector((state) => state.user);  
  const { currentPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  
  const path = useLocation().pathname.split("/")[2];  
  const token = currentUser ? currentUser.token : null; 
  const [message, setMessage] = useState("");

  useEffect(() => {      
    const fetchData = async () => {
      dispatch(fetchStart());  
      try {      
        const response = await GetData( `/${path}`, token);  
        dispatch(fetchSuccess(response.data));  
      } catch (err) {        
        dispatch(fetchFailure());     
      } 
    };
    fetchData();
  }, [path]);

  const handleLike = async () => {
    try {      
      await PostData('/like', {postId:currentPost._id}, token);  
      dispatch(like(currentUser.id)) ; 
    } catch (err) {        
      setMessage(err.response?.data.message);      
    }    
  };

  const handleUnLike = async () => {
    try {      
      await PostData('/unlike', {postId:currentPost._id}, token);  
      dispatch(unlike(currentUser.id)) ; 
    } catch (err) {        
      setMessage(err.response?.data.message);      
    }    
  };
 
  const handleDisLike = async () => {
    try {      
      await PostData('/dislike', {postId:currentPost._id}, token);  
      dispatch(dislike(currentUser.id)) ; 
    } catch (err) {        
      setMessage(err.response?.data.message);      
    }    
  };

  const handleUnDisLike = async () => {
    try {      
      await PostData('/undislike', {postId:currentPost._id}, token);  
      dispatch(undislike(currentUser.id)) ; 
    } catch (err) {        
      setMessage(err.response?.data.message);      
    }    
  };

  
  return (
    <Container>
      {currentPost &&
        <>
          <Content>
            <VideoWrapper>
              <ImgFrame>
                <img src={currentPost.imgUrl} alt="" />
              </ImgFrame> 
            </VideoWrapper>
            <Title>{currentPost.title}</Title>
            <Details>
              <Info>
               {format(currentPost.createdAt)}
              </Info>
              <Buttons>
                { currentUser ? (
                 <>
                  {currentPost.likes.includes(currentUser.id) ? (
                    <Button onClick={handleUnLike}> <ThumbUpIcon />  {currentPost.likes.length} </Button>
                  ) : (
                    <Button onClick={handleLike}> <ThumbUpOutlinedIcon />  {currentPost.likes.length}</Button>
                  )}  

                   {currentPost.dislikes.includes(currentUser.id) ? (
                    <Button onClick={handleUnDisLike}> <ThumbDownIcon />  {currentPost.dislikes.length} </Button>
                  ) : (
                    <Button onClick={handleDisLike}> <ThumbDownOffAltOutlinedIcon />  {currentPost.dislikes.length}</Button>
                  )}

                 </>
                ) : (   
                  <>             
                    <Button style={{cursor: 'default'}}>
                        <ThumbUpOutlinedIcon />   {currentPost.likes.length}
                    </Button> 
                    <Button style={{cursor: 'default'}}>
                        <ThumbDownOffAltOutlinedIcon />   {currentPost.dislikes.length}
                    </Button>  
                  </> 
                )}                           
              </Buttons> 
            </Details>
            <Description>{currentPost.desc}</Description>
            <Hr />
            <Comments postId={currentPost  && currentPost._id} /> 
          </Content>
          
        </>
      }
    </Container>
  );
};

export default Post;
