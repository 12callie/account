type Tag = {
  id: number;
  name: string;
  svg: string;
  type: string;
};
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: '-' | '+';
  amount: string;
  date: string;
};
