import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(86 86 86);
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Button = styled.span`
  cursor: pointer;
  color:red;
  opacity:0.7;
`;

const Comment = ({ comment , handleDelete, currentUser}) => {
  return (
    <Container>
      <Avatar />
      <Details>
        <Name>
          {comment.name} <Date> {format(comment.createdAt)}</Date>
          {
            currentUser && comment.userId === currentUser ? 
            <Button title="Delete" onClick={(e) => handleDelete(comment)}><DeleteForeverIcon style={{fontSize:"16px", marginBottom: "-4px", marginLeft: "10px"}} /> </Button>
            : 
            ""
          }         
        </Name>
        <Text>{comment.desc}</Text>       
      </Details>
    </Container>
  );
};

export default Comment;
