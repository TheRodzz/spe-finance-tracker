import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/globalContext'
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie';

function Navigation({active, setActive}) {
    const {totalBalance} = useGlobalContext()
    const balance = totalBalance()
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const readCookie = () => {
            const myCookieValue = Cookies.get('token');
            console.log('Cookie Value:', myCookieValue);
            setToken(myCookieValue)
        };
        readCookie();
    });
    useEffect(() => {
        if(token)
            userinfo(token);
    }, [token]);
    
    async function userinfo(username){
        const resp = await fetch(`http://localhost:5000/api/v1/get-userinfo/${username}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // credentials: 'include',
        }); 
        if(resp.ok){
            let data = await resp.json()
            console.log("data", data)
            // Cookies.set('token', data.username, { expires: 7 });
            setUser(data)
            // setRedirect(true);
        }else{
          alert('Invalid User')
        }
    }


    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>{user ? user.name : ""}</h2>
                    <span>{user ? user.username : ""}</span>
                    <br></br>
                    <span>${balance}</span>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <Link to={item.link}><li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li> </Link>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    {signout} <a href="/">Sign Out</a>
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation