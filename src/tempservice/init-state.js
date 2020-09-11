
//alert
//recommendation
//notification

const inboxTemplate = [
    {
        status : "Notification", //Notification or Rewards
        date_send: "2012-04-23T00:00:00.000Z",
        title : "Sale Alert! - Julie’s Jewels",
        message : "John, don’t miss out on this 80% off all regular priced accessories promo. \n\nThe deal ends tonight at 8pm, so come in before someone nabs that bracelet you’ve been eyeing.",
        open : false
    },
    {
        status : "Rewards", //Notification or Rewards
        date_send: "2012-05-23T00:00:00.000Z",
        title : "Rewards",
        message : "You have earned 2 Reward point/s. Your points balance as of today is 2. Visit home site to know the list of items you can redeem",
        open : false
    },
    {
        status : "Notification", //Notification or Rewards
        date_send: "2012-06-23T00:00:00.000Z",
        title : "Looking for a deal? - Cheeky Prints",
        message : "Perfect, get 20% off all printing services, and free shipping on any web order. The sale ends tomorrow at 2pm: bit.ly.get-the-goods",
        open : false
    }
]


const walletTemplate = [
    {
        name: "Budget Friendly",
        allocations: [
            {
                description: "Savings",
                percentage: 10,
                frequency: "Monthly", // Monthly, Semi-monthly
                details: {
                    content: "Description of the Budget Friendly "
                }
            }
        ]
    },
    {
        name: "Saving funds",
        allocations: [
            {
                description: "Savings",
                percentage: 20,
            },
            {
                description: "Utilities",
                percentage: 20,
            },
            {
                description: "Travel",
                percentage: 5,
            }
        ]
    },
    {
        name: "Long term",
        allocations: [
            {
                description: "Savings",
                percentage: 40,
            },
            {
                description: "Utilities",
                percentage: 20,
            },
            {
                description: "Travel",
                percentage: 5,
            }
        ]
    }     
]



// no use, just for backup
const initialState = {
    countvisit : 0,
    app_name: "Thrifty Koala",
    useractive : false,
    authorization: "",

    user: {
        email : "john",
        password: "john",
        name : "San Goku",

        inbox : inboxTemplate,
        status : "new",
        rewards : 9.87,

        account: {
            accountNo: "22012345",
            bankName: "BPI",
            balance: 339800.0,
            accounts: [
                {
                    accountNo: "22012345",
                    bankName: "BPI",
                    balance: 339800.0,
                    main : true
                },
                {
                    accountNo: "22012345",
                    bankName: "BDO",
                    balance: 339800.0,
                    main : false
                }
            ]
        },

        purse: {
            pocketAmount: 200,
            allocations: [
                {
                    description: "Savings",
                    amount: 100,
                    active: true
                },
                {
                    description: "Utilities",
                    amount: 0,
                    active: false
                },
                {
                    description: "Travel",
                    amount: 100,
                    active: true
                }
            ]
        },

        vault: {
            vaultBalance : 5900,
            pocketAmount: 500,
            allocations: [
                {
                    id: 1,
                    description: "Savings",
                    targetAmount: 1000000,
                    expiration: "2012-04-23T00:00:00.000Z",
                    requestRelease: false,
                    amount: 500
                }
            ]
        },
        tips: [
            {
              "category": "Travel",
              "details": "Hello Traveler! It looks like you want to go to Paris. Due to your Bronze status, you can enjoy comprehensive insurance coverage w/ our special Parisian Tourist Package! This includes: Medical Insurance, Trip Ensurance, Theft Insurance, Schengen Visa Insurance, & more! Plus, you can earn three Thrifty Points by availing this special travel insurance package. Avail now to enjoy a stres-free vacation!"
            },
            {
              "category": "Food",
              "details": "Hello fellow foodie! We hope you enjoyed your meal at Heat by Shangri-la. For the past month, your food spending has increased by 20% To help reduce your average food spending, you can avail up to 20% discount at all Bistro affiliated restaurants such as Denny's, Fridays, Buffalo Wild Wings, Fish & Co., and many more! Check out the Tips and Recommendations on your dashboard for more ways to manage your finances!"
            }
        ]
    },


    
    action_status: {
        purse: {
            status: "",
            transaction: "",
            message: ""
        }
    },

    login_status : "",
    login_message: "",
    initializeState: false,
    page_loading  : false,
    response_status: "",

    wallet_template: walletTemplate,
    current_inbox : null,

}


const initialStateResult = {
    countvisit : 0,
    app_name: "Thrifty Koala",
    useractive : false,
    authorization: "",

    user: {
        email : "john",
        password: "john",
        name : "Gohan Trunks",

        inbox : inboxTemplate,
        status : "new",
        rewards : 9.87,

        account: {
            accountNo: "22012345",
            bankName: "Gohan Trunks",
            balance: 339800.0,
            accounts: [
                {
                    accountNo: "22012345",
                    bankName: "BPI",
                    balance: 339800.0,
                    main : true
                },
                {
                    accountNo: "22012345",
                    bankName: "BDO",
                    balance: 339800.0,
                    main : false
                }
            ]
        },

        purse: {
            pocketAmount: 200,
            allocations: [
                {
                    id: 1,
                    description: "Savings",
                    amount: 100,
                    active: true
                },
                {
                    id: 2,
                    description: "Utilities",
                    amount: 0,
                    active: false
                },
                {
                    id: 3,
                    description: "Travel",
                    amount: 100,
                    active: true
                },
                {
                    id: 3,
                    description: "Xbox",
                    amount: 100,
                    active: true
                }
            ]
        },

        vault: {
            vaultBalance : 5900,
            pocketAmount: 500,
            allocations: [
                {
                    id: 1,
                    description: "Savings",
                    targetAmount: 1000000,
                    expiration: "2012-04-23T00:00:00.000Z",
                    requestRelease: false,
                    amount: 500
                }
            ]
        },
        tips: [
            {
              "category": "Travel",
              "details": "Hello Traveler! It looks like you want to go to Paris. Due to your Bronze status, you can enjoy comprehensive insurance coverage w/ our special Parisian Tourist Package! This includes: Medical Insurance, Trip Ensurance, Theft Insurance, Schengen Visa Insurance, & more! Plus, you can earn three Thrifty Points by availing this special travel insurance package. Avail now to enjoy a stres-free vacation!"
            },
            {
              "category": "Food",
              "details": "Hello fellow foodie! We hope you enjoyed your meal at Heat by Shangri-la. For the past month, your food spending has increased by 20% To help reduce your average food spending, you can avail up to 20% discount at all Bistro affiliated restaurants such as Denny's, Fridays, Buffalo Wild Wings, Fish & Co., and many more! Check out the Tips and Recommendations on your dashboard for more ways to manage your finances!"
            }
        ]
    },
    action_status: {
        purse: {
            status: "",
            transaction: "",
            message: ""
        }
    },

    login_status : "",
    login_message: "",
    initializeState: false,
    page_loading  : false,
    response_status: "",

    wallet_template: walletTemplate,
    current_inbox : null,

}

module.exports = {
    initialState,
    initialStateResult
}


