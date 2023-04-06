
import Person from "./Person.js";

export default class Teacher extends Person {
    constructor(workDay, salary, ...rest) {
        super(...rest);
        this.workDay = workDay;
        this.salary = salary;
        this.salar = 0;
    }

    getSalc() {
        this.salar = this.workDay * this.salary
    }
}