import { useEffect, useState } from "react"

import styles from "../styles/Transactions.module.css"

import { data } from "../utils/data"

export const Transactions = () => {

  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [filtered, setFiltered] = useState(false)
  const [deposit, setDeposit] = useState(0)
  const [availableBalance, setAvailableBalance] = useState(0)

  const tableRows = (transactions) => (
    transactions.map((info) => (
      <tr key={info.postingDate}>
        <td>{info.postingDate.slice(0, 10)}</td>
        <td>{info.description}</td>
        <td>{info.type}</td>
        <td>{info.amount}</td>
      </tr>
  )))

  //helper function to append the table
  const addRows = (data) => {
    const totalTransactions = transactions.length;
    data.id = totalTransactions + 1;
    const updatedTransactions = [... transactions];
    updatedTransactions.push(data);
    setTransactions(updatedTransactions);
  };
  
  //onChange handler for the amount to be deposited
  const changeDeposit = (event) => {
    setDeposit(event.target.value);
  };
  
  //update available balance and add new row to the table
  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      type: 'CREDIT',
      postingDate: new Date().toISOString(),
      amount: deposit,
      description: 'Deposit'
    };
    setAvailableBalance(Number(availableBalance) + Number(deposit))
    addRows(val)
  };

  useEffect(() => {
    setTransactions(data[0].transactions)
    setAvailableBalance(data[0].openingBalance)
  }, [])
  
  return(
    <div className={styles.div}>
      <div className={styles.depositeDiv}>
        <label className={styles.label}>Deposit:</label>
        <input type="number" value={deposit} onChange={changeDeposit} />
        <button onClick={transferValue}>Deposit</button>
      </div>
      <h4>Available Balance: R{availableBalance}</h4>
      <p className={styles.p}>Transaction History</p>
      <label className={styles.label}>Filter:</label>
      <select 
        name="filter"
        onChange={(e) => {
          setFiltered(true)
          e.target.value === "debit" ?
            setFilteredTransactions(
              transactions.filter(transactionType => transactionType.type === 'DEBIT'))
            : e.target.value === "credit" ?
              setFilteredTransactions(
                transactions.filter(transactionType => transactionType.type === 'CREDIT'))
              : setFiltered(false)
        }}
      >
        <option value="all">All</option>
        <option value="debit">Debit</option>
        <option value="credit">Credit</option>
      </select>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{!filtered ? tableRows(transactions) : tableRows(filteredTransactions)}</tbody>
      </table>
    </div>
  )
}