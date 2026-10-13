const formatIntlDate = (date: Date) =>
    new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Manila",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);

const getIntlDate = (offsetDays = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);

    return formatIntlDate(date);
};

export const intlDate = getIntlDate();
export const endIntlDate = getIntlDate(3);