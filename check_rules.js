module.exports = [
    {
        name: "Valuation Fee Paid",
        condition: (data) => data.isValuationFeePaid === true,
    },
    {
        name: "UK Resident",
        condition: (data) => data.isUKResident === true,
    },
    {
        name: "Risk Rating Medium",
        condition: (data) => data.riskRating === "Medium",
    },
    {
        name: "LTV Below 60%",
        condition: (data) => {
            const convert_num = (amount) => {
                let new_amount = "";
                for (let i of amount) {
                    if (Number.isInteger(parseInt(i))) {
                        new_amount = new_amount + i;
                    }
                }
                return parseInt(new_amount)
            }
            let loan_amount = convert_num(data.mortgage.loanRequired)
            let purchase_price = convert_num(data.mortgage.purchasePrice)
            const ltv = (loan_amount / purchase_price) * 100;
            return ltv < 60;
        },
    },
];