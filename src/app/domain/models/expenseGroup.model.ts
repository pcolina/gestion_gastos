export class ExpenseGroup {
    constructor(
        public id: number,
        public owner: string,
        public description: string,
        public expenseList: number[],
        public createDate: string,
    ) { }
}
