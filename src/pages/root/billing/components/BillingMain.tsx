import { useState, useEffect } from "react";
import BillingDatatable from "./BillingDatatable";
import BillingDeleteConfirmModal from "./BillingDeleteConfirmModal";
import BillingMainHeader from "./BillingMainHeader";
import BillingBlockConfirmModal from "./BillingBlockConfirmModal";
import { useBilling } from "@/hooks/useBilling";
import CommonHeader from "@/components/commonHeader";

function BillingMain() {
  const { status, search, blockBilling, unblockBilling, deleteBillings, data } =
    useBilling();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
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
    setIsReactivateModalOpen(false);
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
      // Don't open modal, notification will be shown by BillingMainHeader
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
      // Don't open modal, notification will be shown by BillingMainHeader
      return;
    }

    setIsUnblockModalOpen(true);
  };

  const handleReactivateClick = () => {
    console.log("Selected rows for reactivation:", selectedRows);
    // Check if any selected row is already active
    const hasActiveRows = selectedRowsData.some(
      (row) => row.status === "active"
    );

    if (hasActiveRows) {
      // Don't open modal, notification will be shown by BillingMainHeader
      return;
    }

    setIsReactivateModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <CommonHeader />
      </div>

      <BillingMainHeader
        status={status}
        search={search}
        onDeleteClick={handleDeleteClick}
        onBlockClick={handleBlockClick}
        onUnblockClick={handleUnblockClick}
        onReactivateClick={handleReactivateClick}
        selectedRows={selectedRows}
        selectedRowsData={selectedRowsData}
      />

      <BillingDatatable
        onSelectionChange={setSelectedRows}
        status={status}
        search={search}
      />

      <BillingDeleteConfirmModal
        open={isDeleteModalOpen}
        handleClose={handleCloseModals}
        onDeleteConfirm={() => {
          console.log("Confirming deletion of IDs:", selectedRows);
          if (selectedRows.length > 0) {
            deleteBillings.mutate(selectedRows);
          }
          handleCloseModals();
        }}
      />

      <BillingBlockConfirmModal
        open={isBlockModalOpen}
        handleClose={handleCloseModals}
        onBlockConfirm={() => {
          console.log("Confirming blocking of IDs:", selectedRows);
          if (selectedRows.length > 0) {
            blockBilling.mutate({
              userIds: selectedRows,
              blockedReason: "Customer blocked by admin",
            });
          }
          handleCloseModals();
        }}
        title="Block Confirmation"
        confirmButtonText="Yes, Block It"
        id={selectedId}
      />

      <BillingBlockConfirmModal
        open={isUnblockModalOpen}
        handleClose={handleCloseModals}
        onBlockConfirm={() => {
          console.log("Confirming unblocking of IDs:", selectedRows);
          if (selectedRows.length > 0) {
            unblockBilling.mutate(selectedRows);
          }
          handleCloseModals();
        }}
        title="Unblock Confirmation"
        confirmButtonText="Yes, Unblock"
        id={selectedId}
      />

      <BillingBlockConfirmModal
        open={isReactivateModalOpen}
        handleClose={handleCloseModals}
        onBlockConfirm={() => {
          console.log("Confirming reactivation of IDs:", selectedRows);
          if (selectedRows.length > 0) {
            unblockBilling.mutate(selectedRows);
          }
          handleCloseModals();
        }}
        title="Reactivate Confirmation"
        confirmButtonText="Yes, Reactivate"
        id={selectedId}
      />
    </div>
  );
}

export default BillingMain;
