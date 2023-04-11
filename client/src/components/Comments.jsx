import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Comment from "./Comment";
import { GetData , PostData, DeleteData} from '../utils/api';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 3px 10px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Error = styled.div`
color:red;
margin-left: 40px;
white-space: pre;
`;

const Comments = ({postId}) => {
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser ? currentUser.token : null;  
  const [inputs, setInputs] = useState({});
  const [comments, setComments] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const fetchComments = async (postId) => {
    try {
      const response = await GetData( `/comment/${postId}`, token);
      setComments(response.data);
      setInputs({});
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchComments(postId); 
  }, [postId]);

  useEffect(() => {    
    if(fetch){       
      fetchComments(postId);
      setFetch(false);
    }    
  }, [fetch]);

  const handleComment = async () => {
    try {      
      await PostData('/comment/create', {...inputs, postId:postId}, token);  
      setFetch(true);
      setMessage("");
    } catch (err) {        
      setMessage(err.response?.data.message);      
    }    
  };
  
  const handleDeleteComment = React.useCallback( async (comment) => {
    try {
      await DeleteData( `/comment/${comment._id}`, token);
      setFetch(true);
    } catch (err) {}
  }, []);

  
  return (
    <Container>
      <NewComment>
        <UserImage />
        <Input
          placeholder="Add a comment..."
          name="desc"
          value={inputs.desc || ""}
          rows={8}
          onChange={handleChange}
        />   
        {
          currentUser && 
          (
            <Button onClick={handleComment}>
              <KeyboardReturnIcon /> Comment
            </Button> 
          )
        }    
        
      </NewComment>
      { message && 
          <Error>
          {message}
        </Error>
        } 
      {comments && comments.map(comment=>(
        <Comment key={comment._id} comment={comment} handleDelete={handleDeleteComment}  currentUser={currentUser ? currentUser.id : null}/>
      ))}
    </Container>
  );
};

export default Comments;
