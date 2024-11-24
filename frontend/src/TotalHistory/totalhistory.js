import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import Orb from '../Components/Orb/Orb';
import bg from '../img/bg.png'
import {MainLayout} from '../styles/Layouts'
import Navigation from '../Components/Navigation/Navigation';

function TotalHistory() {
    const {totaltransactionHistory} = useGlobalContext()

    const [...history] = totaltransactionHistory()
    const [active, setActive] = useState(2)
    const orbMemo = useMemo(() => {
        return <Orb />
      },[])
    return (
        <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
        <HistoryStyled>
            <h2>Transaction History</h2>
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
        </main>
        </MainLayout>
        </AppStyled> 
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default TotalHistory