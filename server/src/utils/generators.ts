
// UserID generator
export const generateUserID = (orderNum: number) => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1);
    const order = String(orderNum).padStart(5, '0');

    return `${year}${month}${order}`;
};


// TaskID generator
export const generateTaskID = (ownerID: string, orderNum: number) => {
    const order = String(orderNum).padStart(4, '0');

    return `${ownerID}${order}`;
};