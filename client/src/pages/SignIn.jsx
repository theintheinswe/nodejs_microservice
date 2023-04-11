import React, { useState } from "react";
import { useDispatch} from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { PostData } from '../utils/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Error = styled.div`
color:red;
white-space: pre;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [singupMessage, setSingupMessage] = useState("");
  const [singinMessage, setSinginMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await PostData('/user/signin', { email, password }, null); 
      dispatch(loginSuccess(res.data));
      navigate("/")
    } catch (err) {
      setSinginMessage(err.response?.data.message)
      dispatch(loginFailure());
    }
  };

  const handleSingup = async(e) =>  {   
    e.preventDefault();
    dispatch(loginStart());
    try {   
      const res = await PostData('/user/signup', { name, email, password }, null);    
      dispatch(loginSuccess(res.data));
      navigate("/")
    } catch (err) {        
      setSingupMessage(err.response?.data.message)
      dispatch(loginFailure());
    }
  }

  return (
    <Container>
      <Wrapper>      
        <Title>Sign in</Title>
        <SubTitle>to continue to Lorem</SubTitle>
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>   
        {singinMessage && 
          <Error>
          {singinMessage}
        </Error>
        }    
        <Title>or</Title>
        <Input
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSingup}>Sign up</Button>
        <hr />
        {singupMessage && 
          <Error>
           {singupMessage}     
        </Error>
        }  
      </Wrapper>      
    </Container>
  );
};

export default SignIn;
