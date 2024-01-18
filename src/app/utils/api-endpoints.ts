export const CYLINDER_SIZE = {
    CYLINDER_SIZE_LIST :'cylinder-sizes/getCylinderSize',
    CYLINDER_SIZE_ADD  :'cylinder-sizes/addCylinderSize',
    CYLINDER_SIZE_DELETE : 'cylinder-sizes/deleteCylinder',
    CYLINDER_SIZE_EDIT:'cylinder-sizes/updateCylinderSize',
}

export const DISTRIBUTOR = {
    DISTRIBUTOR_LIST : 'distributor/getDistributors',
    DISTRIBUTOR_ADD : 'distributor/saveDistributor',
    DISTRIBUTOR_DELETE: 'distributor/deleteDistributor',
    DISTRIBUTOR_EDIT : 'distributor/updateDistributor',
    GET_DISTRIBUTOR_BY_ID:'distributor/getDistributor',
    GET_CITY:'cities'
}

export const GAS_TYPE= { 
    GAS_TYPE_LIST:'gas-details/getGasType',
    GAS_TYPE_ADD:'gas-details/addGasType',
    GAS_TYPE_DELETE:'gas-details/deleteGasType',
    GAS_TYPE_EDIT:'gas-details/updateGasType'
}

export const DISTRIBUTOR_USER={
    DISTRIBUTOR_USER_LIST:'distributor_user/getDistributorUsers',
    DISTRIBUTOR_USER_ADD:'distributor_user/saveDistributorUser',
    DISTRIBUTOR_USER_DELETE:'distributor_user/deleteDistributorUser',
    DISTRIBUTOR_USER_EDIT:'distributor_user/updateDistributorUser',
    DISTRIBUTOR_USER_BY_ID:'distributor_user/getDistributorUser'
}

export const CUSTOMERS = {
    CUSTOMERS_LIST: 'customer-details/ListOfAllCustomer',
    CUSTOMERS_ADD: 'customer-details/AddNewCustomer',
    CUSTOMERS_DELETE: 'customer-details/DeleteCustomer',
    CUSTOMERS_EDIT: 'customer-details/updateCustomer',
    CUSTOMERS_BY_ID: 'customer-details/CustomerById',

    CUSTOMERS_BY_DISTRIBUTOR_LIST: 'CusAndDistMapper/CustomerById',
    CUSTOMERS_BY_DISTRIBUTOR_ADD: '',
    CUSTOMERS_BY_DISTRIBUTOR_DELETE: 'CusAndDistMapper/DeleteCustomer',
    CUSTOMERS_BY_DISTRIBUTOR_EDIT: '',
    //  CUSTOMERS_BY_CUSTOMERCOUNT:'CusAndDistMapper/getCountByDistributor',
    WITH_CUSTOMERS:'cylinder-master/CylinderWithCustomer',
    CUSTOMER_BY_AVAILABLE:'customer-details/ActiveCustomer'
   
}
export const REFILLERS = {
    REFILLERS_LIST: 'Refiller/ListOfAllRefiller',
    REFILLERS_ADD: 'Refiller/AddNewRefiller',
    REFILLERS_DELETE: 'Refiller/DeleteRefiller',
    REFILLERS_EDIT: 'Refiller/updateRefiller',

    REFILLERS_BY_DISTRIBUTOR_LIST: 'RefillerDistMapper/RefillerByDistributor',
    WITH_REFILLERS:'cylinder-master/CylinderWithRefiller'
}

export const INVENTORY={
    INVENTORY_LIST:'cylinder-master/getCylinderMaster',
    INVENTORY_ADD:'cylinder-master/addCylinderMaster',
    INVENTORY_DELETE:'cylinder-master/deleteCylinder',
    INVENTORY_EDIT:'cylinder-master/updateCylinderMaster',

    INVENTORY_GET_INFO: 'cylinder-master/getCylinderId',
    GET_INVENTORY_BY_ID:'cylinder-master/distributor',
    COUNTCYLINDER_BY_ID:'cylinder-master/getCountByCylinderSize',
    COUNT_GASTYPE_BY_ID:'cylinder-master/getCountBygasType',

    UPDATE_CYLINDER_STATUS: 'cylinder-master',
    GET_CYLINDER_HOSTORY: 'Cylindertransaction-details/getCylinderHistory'
}

export const CYLINDER_MASTER={
    CYLINDER_MASTER_LIST:'cylinder-master'
}

export const TRANSACTIONS = {
    TRANSACTION_TYPE: 'Transaction-Type/AllUserType',
    TRANSACTION_DETAILS: 'transaction-details/getTransactionDetail',
    TRANSACTION_DETAILS_FOR_REFILLER: 'cylinder-master/DistributorToRefillerPegination',
    TRANSACTION_ADD: 'transaction-details/addTransaction',
    TRANSACTION_ADD_FOR_REFILLER: 'transaction-details/AddTransactionForRefiller',

    TRANSACTION_DETAIL_BY_DISTRIBUTOR: 'transaction-details/getByAllInfo',
    
 
    
    TRANSACTION_REPORTS: 'Cylindertransaction-details/getByAllInfo',

    TRANSACTIONS_BYCUSTOMER_REPORT:'transaction-details/getByAllInfo',
    BILLING_REPORT: 'Cylindertransaction-details/getByAllInfo',

    // AVAILABLE_CYLINDERS_INVENTORY: 'cylinder-master',
    AVAILABLE_CYLINDERS_INVENTORY:'cylinder-master/withQr',
    AVAILABLE_CYLINDERS_DCR: 'cylinder-master/getPaginationList',
    AVAILABLE_CYLINDERS_ECR: 'Cylindertransaction-details/getPaginationListCustToDist',
    TRANSACTION_ADD_FILTERS: 'cylinder-master/getByFilter',
  
    TRANSACTIONS_DCR_REPORTS:'Cylindertransaction-details/getByTransaction',
    AVAILABLE_CYLINDER:'cylinder-master/AvailableCylinderCount',
    TRANSACTIONS_FILLED_CYLINDER:'cylinder-master/filledCylinderCount',
    TRANSACTIONS_EMPTY_CYLINDER:'cylinder-master/EmptyCylinderCount',
    AVAILABLE_CYLINDER_BYDISTRIBUTOR:'cylinder-master/AvailableCylinderCountByDistributor',
    // TRANSACTION_EMPTY_CYLINDER_BY_DISTRIBUTOR:'cylinder-master/EmptyCylinderCountByDistributor',
    TRANSACTION_EMPTY_CYLINDER_BY_DISTRIBUTOR:`cylinder-master/EmptyCylinderInGodown`,
    // TRANSACTIONS_FILLED_CYLINDER_BY_DISTRIBUTOR:'cylinder-master/filledCylinderCountByDistributor',

    TRANSACTIONS_FILLED_CYLINDER_BY_DISTRIBUTOR:`cylinder-master/FilledCylinderInGodown`,
    REFILLER_TO_DISTRIBUTOR: 'Cylindertransaction-details/getPeginatedCylinderListfromRefiller',

    TRANSACTIONS_LIST_SEARCH: 'transaction-details/search',
    GET_FILLED_CYLINDERS_IN_GODOWN:'cylinder-master/FilledCylinderInGodown',
   GET_EMPTY_CYLINDER_INGODOWN:'cylinder-master/EmptyCylinderInGodown',
   EDIT_TRANS_DATE:'transaction-details/updateTransactionDate'
   
}

export const  OWNER={
    OWNER_GET:'Owner-Type/AllOwnerType'
}

export const AUTH = {
    LOGIN: 'auth/login',
    RESET_PASS: 'reset-password'
}

export const CITES = {
    GET_STATES: 'cities/states',
    GET_CITIES_BY_STATE: 'cities/state',
}

export const REPORT={
    GET_DAILYSALES_REPORTS:'Cylindertransaction-details/getDailySalesReport',
    CUSTOMER_HOLDING_FILTER_BY_CUSTOMER:'Cylindertransaction-details/CustomerHoldingReport',
    CUSTOMER_HOLDING_REPORT:'Cylindertransaction-details/NewCustomerHoldingReport',
    SEARCH_BY_POST:'Cylindertransaction-details/searchDeliveryReport'
}

export const LOCATION = {
    CUSTOMER_LOCATION_BY_CUSTOMER: 'customer_location/CustomerLocation',
    CUSTOMER_SITE_DETAILS:'customer-details/AddExcitingCustomerAddress',
    GET_SITE_BY_CUSTOMER:'customer_location/CustomerLocation'
}
export const IMAGE ={
    DISTRIBUTOR_IMAGE: 'image/uploadFile',
    GET_IMAGE:'image/download'
}