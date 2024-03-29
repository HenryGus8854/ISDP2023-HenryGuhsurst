import React,{useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import '../../../../Main.css';
import AcceptDelivery from './AcceptDelivery';

function DeliveredOrders({orders,user, globalOrders}) {
    const [allOrders, setAllOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [siteInv, setSiteInv] = useState([]);
    const [items, setItems] = useState([]);


    const handleRowClick = (id) => {
      setSelectedRow(id);
    };
    
    

    const handleView = (order) => {
        console.log(order);
        setSelectedOrder(order);
    };

    useEffect(()=>{
        //console.log(user);
    },[user])
    useEffect(()=>{
        if(orders){
            setAllOrders(orders);
            fetch('http://localhost:8000/inventory/'+user.siteID)
            .then(response => response.json())
            .then(data => {
            setSiteInv(data);
            console.log(data);
            });
        }
    },[orders])
    useEffect(()=>{
        //console.log(selectedOrder)
    },[selectedOrder])
  

    function permissions(){
    }

    function handleDeliverOrders(order){
        console.log(order);
        setSelectedOrder(order);
    }

  return (
    <div>
    <h4>Orders that have been Delivered</h4>
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>To</th>
        <th>From</th>
        <th>Status</th>
        <th>Emergency</th>
        <th>Transaction-ID</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {allOrders.map((order) => (
        <React.Fragment key={order.txnID}>
          <tr key={order.txnID} onClick={() => handleRowClick(order.txnID)} className={selectedRow === order.txnID ? " selected" : ""}>
            
            <td>{order.site_txn_siteIDToTosite.name}</td>
            <td>{order.site_txn_siteIDFromTosite.name}</td>
            <td>{order.status}</td>
            <td>{order.emergencyDelivery ? "Yes" : "No"}</td>
            <td>{order.txnID}</td>
            <td>
                <button  onClick={() => {handleDeliverOrders(order); console.log(order);}}>Accept</button>
            </td>
          </tr>
          {selectedOrder.txnID === order.txnID && (
            <tr>
              <td colSpan="6">
                <AcceptDelivery  user={user} allOrders={allOrders} setAllOrders={setAllOrders} order={selectedOrder} />
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  </Table>
    </div>
  )
}

export default DeliveredOrders