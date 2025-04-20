import { Avatar, Button } from "@mui/material";
import {
  GridCellParams,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useBilling } from "@/hooks/useBilling";
import { formatDate } from "@/utils/utility";
import Table from "@/components/table";

type BillingDataTableProps = {
  status?: string;
  search?: string;
  onSelectionChange?: (selectedIds: string[]) => void;
};

function BillingDatatable({ onSelectionChange }: BillingDataTableProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, page, size, handlePageChange, handleSizeChange } =
    useBilling();

  useEffect(() => {
    console.log("BillingDatatable rendered with page:", page, "size:", size);
    console.log("Data loaded:", data);
  }, [data, page, size]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
      align: "left",
      headerAlign: "center",
      minWidth: 170,
      renderCell: (params: GridCellParams) => (
        <div className="flex items-center">
          <div className="w-10 flex-shrink-0">
            <Avatar
              src={params.row.avatar}
              alt={params.row.name}
              className="w-4 h-4"
            />
          </div>
          <span className="ml-3 font-medium text-gray-700">
            {params.row.name}
          </span>
        </div>
      ),
    },
    {
      field: "customer_id",
      headerName: "Customer ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
    },
    {
      field: "registration_date",
      headerName: "Registration Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "totalRides",
      headerName: "Total rides",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 50,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      renderCell: (params: GridCellParams) => {
        const value = params.value as string;
        const isActive = value === "active";
        const isInactive = value === "inactive";
        return (
          <div
            className={`${
              isActive
                ? "bg-green-50 text-green-100"
                : isInactive
                ? "bg-red-50 text-red-100"
                : "bg-action-selected text-inactive"
            }  px-2.5 py-1 rounded-[100px] text-center`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      hideable: false,
      renderHeader: () => {
        return null;
      },
      minWidth: 100,
      renderCell: (params: GridCellParams) => (
        <Button
          style={{
            backgroundColor: "#2196F3",
            height: "30px",
            borderRadius: "4px",
            fontSize: "10px",
            fontFamily: "Montserrat",
          }}
          variant="contained"
          size="small"
          onClick={() =>
            navigate(`/taxi-details/${params.row.id}`, {
              state: { from: location.pathname },
            })
          }
        >
          Details
        </Button>
      ),
    },
  ];

  const rows = data?.data || [];
  const totalRows = data?.page?.records?.total || 0;

  const handleSelectionChange = (newSelectionModel: GridRowSelectionModel) => {
    if (onSelectionChange) {
      onSelectionChange(newSelectionModel.map((id) => id.toString()));
    }
  };

  return (
    <Table
      columns={columns}
      rows={rows}
      onRowSelectionModelChange={handleSelectionChange}
      pageSize={size}
      page={page - 1}
      onPageChange={(newPage) => handlePageChange(newPage + 1)}
      onPageSizeChange={handleSizeChange}
      totalRows={totalRows}
      loading={isLoading}
      columnHeaderHeight={50}
      autoHeight={false}
      checkboxSelection={true}
    />
  );
}

export default BillingDatatable;
