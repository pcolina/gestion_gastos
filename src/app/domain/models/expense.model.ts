export class Expense {
    constructor(
        public id: number,
        public expenseGroup: number,
        public description: string,
        public payer: string,
        public amount: number,
        public paymentDate: string,
        public currency: string,
    ) { }
}
