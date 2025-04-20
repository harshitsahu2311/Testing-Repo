import { useState, useEffect } from "react";
import CustomerMainHeader from "./CustomerMainHeader";
import CustomerDatatable from "./CustomerDatatable";
import CustomerBlockConfirmModal from "./CustomerBlockConfirmModal";
import CustomerDeleteConfirmModal from "./CustomerDeleteConfirmModal";
import CommonHeader from "@/components/commonHeader";
import { useCustomer } from "@/hooks/useCustomer";

// Using lowercase status type to match CustomerMainHeader
type StatusType = "all" | "active" | "inactive";

function CustomerMain() {
  const { status, search, blockUser, unblockUser, deleteUsers, data } =
    useCustomer();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedRowsData, setSelectedRowsData] = useState<
    Array<{ id: string; status: string }>
  >([]);

  // Update selected rows data when selection or data changes
  useEffect(() => {
    if (data?.data && selectedRows.length > 0) {
      const rowsData = selectedRows.map((id) => {
        const row = data.data.find((item) => item.id === id);
        return { id, status: row?.status || "" };
      });
      setSelectedRowsData(rowsData);
    } else {
      setSelectedRowsData([]);
    }
  }, [selectedRows, data?.data]);

  const handleCloseModals = () => {
    setIsDeleteModalOpen(false);
    setIsBlockModalOpen(false);
    setIsUnblockModalOpen(false);
    setSelectedId("");
  };

  const handleDeleteClick = () => {
    console.log("Selected rows for deletion:", selectedRows);
    setIsDeleteModalOpen(true);
  };

  const handleBlockClick = () => {
    console.log("Selected rows for blocking:", selectedRows);
    // Check if any selected row is already inactive
    const hasInactiveRows = selectedRowsData.some(
      (row) => row.status === "inactive"
    );

    if (hasInactiveRows) {
      // Don't open modal, notification will be shown by CustomerMainHeader
      return;
    }

    setIsBlockModalOpen(true);
  };

  const handleUnblockClick = () => {
    console.log("Selected rows for unblocking:", selectedRows);
    // Check if any selected row is already active
    const hasActiveRows = selectedRowsData.some(
      (row) => row.status === "active"
    );

    if (hasActiveRows) {
      // Don't open modal, notification will be shown by CustomerMainHeader
      return;
    }

    setIsUnblockModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <CommonHeader />
      </div>

      <CustomerMainHeader
        status={status as StatusType}
        search={search}
        onDeleteClick={handleDeleteClick}
        onBlockClick={handleBlockClick}
        onUnblockClick={handleUnblockClick}
        selectedRows={selectedRows}
        selectedRowsData={selectedRowsData}
      />

      <div className="bg-white rounded-xl shadow-sm">
        <CustomerDatatable onSelectionChange={setSelectedRows} />
      </div>

      <CustomerDeleteConfirmModal
        open={isDeleteModalOpen}
        handleClose={handleCloseModals}
        onDeleteConfirm={() => {
          console.log("Confirming deletion for:", selectedRows);
          if (selectedRows.length > 0) {
            deleteUsers.mutate(selectedRows);
          }
          handleCloseModals();
        }}
        id={selectedId}
      />

      <CustomerBlockConfirmModal
        open={isBlockModalOpen}
        handleClose={handleCloseModals}
        onBlockConfirm={() => {
          console.log("Confirming blocking for:", selectedRows);
          if (selectedRows.length > 0) {
            blockUser.mutate(selectedRows);
            handleCloseModals();
          }
        }}
        id={selectedId}
      />

      <CustomerBlockConfirmModal
        open={isUnblockModalOpen}
        handleClose={handleCloseModals}
        onBlockConfirm={() => {
          console.log("Confirming unblocking for:", selectedRows);
          if (selectedRows.length > 0) {
            unblockUser.mutate(selectedRows);
            handleCloseModals();
          }
        }}
        title="Unblock Confirmation"
        message="Are you sure you want to unblock the selected users?"
        confirmButtonText="Yes, Unblock"
        id={selectedId}
      />
    </div>
  );
}
export default CustomerMain;
