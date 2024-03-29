import React, { useState } from 'react';

function InvItemDetails({user, selectedItem, setSelectedItem }) {
  const [itemLocation, setItemLocation] = useState(selectedItem.itemLocation);

  const handleLocationChange = (event) => {
    setItemLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedItem = { ...selectedItem, itemLocation: itemLocation };
    console.log(updatedItem);
    delete updatedItem.item;
    delete updatedItem.site;
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
    fetch('http://localhost:8000/inventory/update/single/'+updatedItem.siteID, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({item: updatedItem})
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
      <h5>Move This Item</h5>
      <form onSubmit={handleSubmit}>
        <label>
          Item ID: {selectedItem.itemID}
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={itemLocation === null ? '' : itemLocation}
            onChange={handleLocationChange}
          />
        </label>
        <br />
        <label>
          Quantity: {selectedItem.quantity}
        </label>
        <br />
        <label>
          Reorder Threshold: {selectedItem.reorderThreshold}
        </label>
        <br />
        <label>
          Site ID: {selectedItem.siteID}
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default InvItemDetails;
