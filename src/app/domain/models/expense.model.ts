export class Expense {
    constructor(
        public id: number,
        public description: string,
        public payer: string,
        public amount: string,
        public paymentDate: string,
        public currency: string,
    ) { }
}
