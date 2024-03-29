export const constants = {
    ADDUSER: 'ADDUSER',
    EDITUSER: 'EDITUSER',
    DELETEUSER: 'DELETEUSER',
    READUSER: 'READUSER',
    CREATEPERMISSION: 'CREATEPERMISSION',
    SETPERMISSION: 'SETPERMISSION',
    MOVEINVENTORY: 'MOVEINVENTORY',
    CREATESTOREORDER: 'CREATESTOREORDER',
    RECEIVESTOREORDER: 'RECEIVESTOREORDER',
    PREPARESTOREORDER: 'PREPARESTOREORDER',
    FULFILSTOREORDER: 'FULFILSTOREORDER',
    ADDITEMTOBACKORDER: 'ADDITEMTOBACKORDER',
    CREATEBACKORDER: 'CREATEBACKORDER',
    EDITSITE: 'EDITSITE',
    ADDSITE: 'ADDSITE',
    ADDSUPPLIER: 'ADDSUPPLIER',
    VIEWORDERS: 'VIEWORDERS',
    DELETELOCATION: 'DELETELOCATION',
    EDITINVENTORY: 'EDITINVENTORY',
    EDITITEM: 'EDITITEM',
    DELIVERY: 'DELIVERY',
    ACCEPTSTOREORDER: 'ACCEPTSTOREORDER',
    MODIFYRECORD: 'MODIFYRECORD',
    CREATELOSS: 'CREATELOSS',
    PROCESSRETURN: 'PROCESSRETURN',
    ADDNEWPRODUCT: 'ADDNEWPRODUCT',
    EDITPRODUCT: 'EDITPRODUCT',
    CREATESUPPLIERORDER: 'CREATESUPPLIERORDER',
    CREATEREPORT: 'CREATEREPORT',
    //PermissionLevel CONSTS
    REGIONAL_MANAGER: 'Regional Manager',
    FINANCIAL_MANAGER: 'Financial Manager',
    STORE_MANAGER: 'Store Manager',
    WAREHOUSE_MANAGER: 'Warehouse Manager',
    TRUCKING_DELIVERY: 'Trucking / Delivery',
    WAREHOUSE_EMPLOYEE: 'Warehouse Employee',
    ADMINISTRATOR: 'Administrator',
  };

  export const txnTypes = {
    BACK_ORDER: 'Back Order',
    DAMAGE: 'Damage',
    GAIN: 'Gain',
    LOSS: 'Loss',
    REJECTED: 'Rejected',
    RETURN: 'Return',
    SALE: 'Sale',
    STORE_ORDER: 'Store Order',
    SUPPLIER_ORDER: 'Supplier Order',
    CORRECTION: 'Correction',
    CURBSIDE: 'Curbside',
    ONLINE: 'Online',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
  };

  export const txnStatus = {
    //Order CONSTS
    NEW: 'NEW',
    SUBMITTED: 'SUBMITTED',
    RECEIVED: 'RECEIVED',
    PROCESSING: 'PROCESSING',
    READY: 'READY',
    IN_TRANSIT: 'IN TRANSIT',
    DELIVERED: 'DELIVERED',
    CLOSED: 'CLOSED',
    BACKORDER: 'BACKORDER',
    REJECTED: 'REJECTED',
    CANCELLED: 'CANCELLED',
  };
  