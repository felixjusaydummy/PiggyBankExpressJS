const backupinitialState = [
    {
        id : "ccruz_02",
        name : "John Smith",
        username: "john",
        password: "password",

        account: {
            accountNo: "22012345",
            bankName: "BPI",
            balance: 339800.0
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
        }
    }
]
