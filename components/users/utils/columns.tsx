import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { Badge } from "@/components/common";
import { useDateFormatter, useSession } from "@/hooks";
import { deleteUserRequest } from "@/client/endpoints";
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

  const { mutate: deleteUser } = useMutation(deleteUserRequest, {
    onSuccess: (res) => {
      refetch();
      showMessage(res.data.message);
    },
  });

  const deleteConfirmation = async (id: number) => {
    const data = await showDeleteConfirmation(
      "Do you want to move this user to trash?"
    );
    if (data?.isConfirmed) {
      deleteUser(id);
    }
  };

  const cols = [
    { accessor: "full_name", title: "Name", sortable: true },
    { accessor: "email", title: "Email", sortable: true },
    {
      accessor: "active",
      title: "Status",
      sortable: true,
      render: (row: any) => {
        return (
          <>
            {row?.active == 1 ? (
              <Badge type="success" message="Active" />
            ) : (
              <Badge type="danger" message="Inactive" />
            )}
          </>
        );
      },
    },
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
              onClick={() => router.push(LINKS.users.edit(row.id))}
            >
              <IconPencil />
            </span>
            {session && session?.user?.id && session?.user?.id !== row.id ? (
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
