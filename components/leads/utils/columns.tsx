import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useDateFormatter, useSession } from "@/hooks";
import { deleteLeadRequest } from "@/client/endpoints";
import { LINKS } from "@/constants";
import IconPencil from "@/components/icon/icon-pencil";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { showDeleteConfirmation, showMessage } from "@/utils";

type TProps = {
  refetch: () => void;
};

export const getColumns = ({ refetch }: TProps) => {
  const router = useRouter();
  const { session, userType } = useSession();
  const { formatListDate, formatListTime } = useDateFormatter();
  const userPermission = session ? session?.user?.permissions : null;

  const { mutate: deleteLead } = useMutation(deleteLeadRequest, {
    onSuccess: (res) => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      "Do you want to move this lead to trash?"
    );
    if (data?.isConfirmed) {
      deleteLead(id);
    }
  };

  const cols = [
    { accessor: "first_name", title: "First Name", sortable: true },
    { accessor: "last_name", title: "Last Name", sortable: true },
    { accessor: "email", title: "Email", sortable: true },
    { accessor: "status", title: "Status", sortable: true },
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
            {userType === 'admin' || userPermission && userPermission[0]['edit'] ? (
              <span
                className="cursor-pointer"
                onClick={() => router.push(LINKS.leads.edit(row.id))}
              >
                <IconPencil />
              </span>
            ) : null}
            {userType === 'admin' || userPermission && userPermission[0]['delete'] ? (
              <span
                className="cursor-pointer"
                onClick={() => deleteConfirmation(row.id)}
              >
                <IconTrashLines />
              </span>
            ) : null}
          </div>
        );
      },
    },
  ] as Array<any>;

  return cols;
};
