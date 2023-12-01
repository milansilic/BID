export class EnumHelper {

    static getEnumDropdown(enumForDropdown, checkCamelCase = true) {

        const StringIsNumber = value => isNaN(Number(value)) === false;

        return Object.keys(enumForDropdown)
            .filter(StringIsNumber)
            .map((key) => {
                return {
                    key: Number(key),
                    value: checkCamelCase ? this.camelCaseToWords(enumForDropdown[key]) : enumForDropdown[key]
                }
            });
    }

    // create function to add whitespace between camelCase words
    static camelCaseToWords(text) {
        return text.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
    }

    // return enum string value by enum number value
    static getEnumString(enumForDropdown, enumNumberValue) {
        return enumForDropdown[enumNumberValue];
    }
}
