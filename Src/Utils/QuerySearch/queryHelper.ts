function getValue<T>(obj: T | string, key: string): (T | string) {
    const {[key as keyof T]: value} = obj;
    return typeof value === 'object' ? value as T : value as string;
}

function checkMatch<T, T2>(
    obj: T | string,
    querys: T2,
    query: string
): boolean {
    if (typeof obj === 'object' && obj !== null && !obj.hasOwnProperty(query)) {
        const condition: boolean[] = Object.keys(obj).map((item: string) => {

            const value: T | string = getValue<T>(obj, item);
            return checkMatch<T, T2>(
                value,
                querys,
                query
            );

        });
        return condition.some((item: boolean): boolean => item === true);

    } else {

        const valueToSearchFrom: T | string = getValue(obj, query);

        const valueToFind: string = querys[query as keyof T2] as string

        return typeof valueToSearchFrom === "string"
            ? valueToSearchFrom.includes(valueToFind)
            : false;

    }


}

export function findMatch<T, T2>(
    obj: T,
    querys: T2
): boolean {
    if (typeof querys === 'object' && querys !== null) {

        const booleanArray:boolean[] = Object.keys(querys).map((item: string) => {

            return checkMatch<T, T2>(obj, querys, item);
        });
        return booleanArray.some((item:boolean):boolean => item === true);
    }
    return false

}
