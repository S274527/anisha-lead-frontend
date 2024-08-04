import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useDateFormatter, useSession } from "@/hooks";
import { deleteFaqRequest } from "@/client/endpoints";
import { LINKS } from "@/constants";
import IconPencil from "@/components/icon/icon-pencil";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { showDeleteConfirmation, showMessage } from "@/utils";

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { session } = useSession();
  const { formatListDate, formatListTime } = useDateFormatter();

  const { mutate: deleteFaq } = useMutation(deleteFaqRequest, {
    onSuccess: (res) => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      "Do you want to move this faq to trash?"
    );
    if (data?.isConfirmed) {
      deleteFaq(id);
    }
  };

  const cols = [
    { accessor: "title", title: "Name", sortable: true },
    {
      accessor: "createdAt",
      title: "Created",
      sortable: true,
      render: (row: any) => {
        return (
          <>
            <div>{formatListDate(row.createdAt)}</div>
            <div className="text-primary">{formatListTime(row.createdAt)}</div>
          </>
        );
      },
    },
    {
      accessor: "actions",
      title: "Actions",
      render: (row: any) => {
        return (
          <div className="flex items-center gap-4">
            <span
              className="cursor-pointer"
              onClick={() => router.push(LINKS.faq.edit(row.id))}
            >
              <IconPencil />
            </span>
            <span
                className="cursor-pointer"
                onClick={() => deleteConfirmation(row.id)}
              >
                <IconTrashLines />
              </span>
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};
