import { useRouter } from 'next/navigation';
import { useDateFormatter } from '@/hooks';

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { formatListDate, formatListTime } = useDateFormatter();

  const cols = [
    { accessor: 'title', title: 'Name', sortable: true },
    { accessor: 'title', title: 'Permissions', sortable: false, render: (row: any) => {
      return (
        <>
          <div>Add, Edit, View, Delete</div>
        </>
      );
    }, },
    {
      accessor: 'createdAt',
      title: 'Created',
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div>{formatListDate(row.createdAt)}</div>
            <div className="text-primary">{formatListTime(row.createdAt)}</div>
          </>
        );
      },
    }
  ] as Array<any>;

  return cols;
};
