type Tag = {
    id: number,
    name: string,
};
type RecordItem = {
    tags: Tag[],
    notes: string,
    type: "-" | '+',
    amount: string,
};