export function search(arr, input) {
    if (input.length === 0) {
        return arr;
    }

    return arr.filter((region) => {
        return region.key.toLowerCase().indexOf(input.toLowerCase()) > -1;
    })
}
