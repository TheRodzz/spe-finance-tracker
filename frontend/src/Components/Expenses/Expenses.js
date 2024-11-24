import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import Orb from '../Orb/Orb';
import bg from '../../img/bg.png'
import {MainLayout} from '../../styles/Layouts'
import Navigation from '../Navigation/Navigation';

function Expenses() {
    const {addIncome, expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()
    const [active, setActive] = useState(4)
    const orbMemo = useMemo(() => {
        return <Orb />
      },[])
    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
            <ExpenseStyled>
                <InnerLayout>
                    <h1>Expenses</h1>
                    <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span></h2>
                    <div className="income-content">
                        <div className="form-container">
                            <ExpenseForm />
                        </div>
                        <div className="incomes">
                            {expenses.map((income) => {
                                const {_id, title, amount, date, category, description, type} = income;
                                console.log(income)
                                return <IncomeItem
                                    key={_id}
                                    id={_id} 
                                    title={title} 
                                    description={description} 
                                    amount={amount} 
                                    date={date} 
                                    type={type}
                                    category={category} 
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteExpense}
                                />
                            })}
                        </div>
                    </div>
                </InnerLayout>
            </ExpenseStyled>
          </main>
        </MainLayout>
        </AppStyled> 
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
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


export default Expenses