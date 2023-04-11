import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import { GetData, PostData } from '../utils/api';
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Error = styled.div`
  color:red;
  white-space: pre;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("q");

  useEffect(() => {      
    const fetchData = async () => {      
      try {          
        const response = await GetData( `/`, null);       
        setPosts(response.data); 
        setMessage(""); 
      } catch (err) {        
        setMessage(err.response?.data.message);
      } 
    };
    fetchData();
  }, []);

  useEffect(() => {  
      
    const fetchData = async () => {      
      try {         
        if(query){
          const response = await PostData( `/search`, {filter:query},null);
          setPosts(response.data); 
          setMessage(""); 
        }else{
          const response = await GetData( `/`, null);
          setPosts(response.data); 
          setMessage(""); 
        }        
      } catch (err) {        
        setMessage(err.response?.data.message);
      } 
    };
    fetchData();
  }, [query]);

  return (
    <Container>      
      {message && 
        <Error>
        {message}
      </Error>
      }             
      {posts.map((post) => (
        <Card key={post._id} post={post}/>
      ))}      
    </Container>
  );
};

export default Home;
