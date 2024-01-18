

import { LOCALSTORAGE_VALUES } from "./app-constants";


export const MENU_ITEMS = [
    {
        title: 'Dashboard',
        link: 'dashboard',
        home: true,
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.DISTRIBUTOR,LOCALSTORAGE_VALUES.ADMIN, LOCALSTORAGE_VALUES.DISTRIBUTOR_USER],
        subMenu:[],
        icon:'grid_view'
    },
   
    {
        title: 'Distributor User',
        link: 'distributor-user',
        home: true, 
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.DISTRIBUTOR],
        icon:'group'
    },
    {
        title: 'Inventory',
        link: 'inventory',
        home: true,
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.DISTRIBUTOR, LOCALSTORAGE_VALUES.DISTRIBUTOR_USER],
        icon:'inventory'
    },
    {

        title: 'Customers',
        link: 'customers',
        home: true,
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.DISTRIBUTOR,LOCALSTORAGE_VALUES.DISTRIBUTOR_USER],
        icon:'badge'
    },
    {

        title: 'Refillers',
        link: 'refillers',
        home: true,
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.DISTRIBUTOR],
        icon:'local_gas_station'
    },
    {
        title: 'Transactions',
        link: 'transactions',
        home: true,
        
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.DISTRIBUTOR, LOCALSTORAGE_VALUES.DISTRIBUTOR_USER],
        icon:'paid'

    },   
    {
        title: 'Cylinder Size',
        link: 'cylinder-size',
        home: true, 
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.ADMIN],
        icon:'propane_tank'

    },
    {
        title: 'Gas Type',
        link: 'gas-type',
        home: true, 
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.ADMIN],
        icon:'local_gas_station'
    },
    {

        title: 'Distributor',
        link: 'distributors',
        home: true,
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.ADMIN],
        subMenu:[],
        icon:'person'
    },
    {
        title:'Reports-Menu',
        home: true,
        hidden: false,
        userAccess: [LOCALSTORAGE_VALUES.DISTRIBUTOR, LOCALSTORAGE_VALUES.DISTRIBUTOR_USER],
        icon:'arrow_drop_down',
        subMenu:[
            {
                title:'Daily Sales Report',
                link:'reports/daily-sales'
            },
            {
                title:'Delivery Reports',
                link:'reports/delivery-report'
            },
            {
                title:'Customer Holding',
                link:'reports/customer-holding'
            },
            {
                title:'Aging Reports',
                link:'reports/aging-report'
            }
            
        ]
    }
        
    
    
]