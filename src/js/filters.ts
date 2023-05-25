import { abbreviateNumber } from "js-abbreviation-number";

export default {

    numberAbreviate(value: any) {
        return abbreviateNumber(value, 2)
    },

    truncate(text: string, length = 50, suffix = "...") {
        if (text.length > length) {
            return text.substring(0, length) + suffix;
        } else {
            return text;
        }
    },


    lessonOrder(order: string) {
        if (String(order).length > 3) {
            return order.toString().substr(0, 3) + "+";
        } else {
            return order;
        }
    },

    first4Chars(value: string) {
        return value.substring(0, 4);
    },

    last4Chars(value: string) {
        return value.substring(value.length - 4);
    },

    pluralize(word: string, amount: number, replace = "") {
        if (amount > 1 || amount === 0) {
            if (replace) {
                return replace;
            } else {
                return `${word}s`;
            }
        } else {
            return word;
        }
    },

    formatNumber(value: number) {
        if (value === undefined) {
            return 0
        } else {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
}