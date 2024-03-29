import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';


function InventoryEditPage({ user, invForEdit }) {
    let res;
  const [inventory, setInventory] = useState(invForEdit);
  const [curUser, setCurUser] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    const text = event.target.value.toLowerCase();
    const filtered = inventory.filter(item =>
      item.itemID.includes(parseInt(text)) ||
      item.name.toLowerCase().includes(text) ||
      item.description.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text)
    );
    setSearchText(text);
    setInventory(filtered);
}

  const handleThresholdChange = (itemId, event) => {
    const updatedInventory = inventory.map(item => {
      if (item.itemID === itemId) {
        return {
          ...item,
          reorderThreshold: parseInt(event.target.value)
        };
      }
      return item;
    });
    setInventory(updatedInventory);
  };

  useEffect(() => {
    if(user){
        setCurUser(user);
    }
  }, [user])
  

  const handleSubmit = event => {
    event.preventDefault();
    // Send updated inventory data to server or update database
    console.log(inventory);
    let txnAudit = {
      txnID:0,
      txnType: "invUpdate",
      status: "Success",
      SiteID: user.siteID,
      deliveryID: 0,
      employeeID: user.employeeID,
      notes: user.username+' updated inventory',
    };
    fetch('http://localhost:8000/txnaudit/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(txnAudit)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    fetch('http://localhost:8000/inventory/update/'+curUser.siteID, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({updateInventoryDto: inventory})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        window.location.reload();
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
  };

  return (
    <div>
      <h2>Inventory Edit Page</h2>
      <p>Hello - {curUser != null ? curUser.username || res() : ''}</p>
      <input type="text" placeholder="Search items" value={searchText} onChange={handleSearch} />
      <form onSubmit={handleSubmit}>
        <Table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Location</th>
              <th>Quantity</th>
              <th>Reorder Threshold</th>
              <th>Site ID</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.itemID}>
                <td>{item.itemID}</td>
                <td>{item.itemLocation}</td>
                <td>{item.quantity}</td>
                <td>
                  <input
                    type="number"
                    value={item.reorderThreshold}
                    onChange={event => handleThresholdChange(item.itemID, event)}
                  />
                </td>
                <td>{item.siteID}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default InventoryEditPage;