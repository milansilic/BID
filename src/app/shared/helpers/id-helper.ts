
export class IdHelper {

    // generate temporary id out of random numbers
    static generateTempNumerId() {
        return Math.floor(Math.random() * 10000000000000000);
    }
}