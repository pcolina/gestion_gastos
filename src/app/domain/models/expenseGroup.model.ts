export class ExpenseGroup {
    constructor(
        public id: number,
        public owner: number,
        public description: string,
        public userList: string[],
        public createDate: string,
    ) { }
}
