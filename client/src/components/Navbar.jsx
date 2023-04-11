import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux"; 
import { logout } from "../redux/userSlice";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  display: flex;
`;
const Logo = styled.h1`
  flex:15%; 
  display: flex;
  align-self: center;
  justify-content: center; 
`;

const Wrapper = styled.div`
  flex:85%;
  display: flex;
  align-items: center;
  justify-content: center
  height: 100%;
  padding: 0px 20px;
  position: relative; 
`;

const Search = styled.div`
  position: absolute; 
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text}; 
`;

const TopBanner = styled.div`
  flex : 50%;  
  display: flex;
  align-items: center;
  justify-content: end;  
  color: ${({ theme }) => theme.text}; 
`

const Input = styled.input` 
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
 
  
const handleLogout = async (e) => {
  e.preventDefault();
  dispatch(logout()); 
};


  return (
    <>
      <Container>
        <Logo><Link to="/" style={{ textDecoration: "none" }}>Lorem</Link></Logo>
        <Wrapper>
        <TopBanner>          
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}  style={{ width: '50px'}}/>
          </Search>
          </TopBanner>
          <TopBanner>
          {currentUser ? (
            <User>              
              <Avatar src={currentUser.img} />
              {currentUser.name} 
              <CloudUploadIcon onClick={() => setOpen(true)} style={{cursor:"pointer"}} />
              <Button onClick={handleLogout}>
                <LogoutIcon />
                Logout
              </Button>
              
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
          </TopBanner>
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} /> }
    </>
  );
};

export default Navbar;
