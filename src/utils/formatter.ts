
export class Formatter {

    static currency(value: number, decimals = 2): string {
        return new Intl.NumberFormat('ca-ES', {
            style: 'currency',
            currency: 'eur',
            maximumFractionDigits: decimals
        }).format(value);
    }
}