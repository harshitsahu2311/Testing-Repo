
import { DataGrid, GridColDef, GridRowSelectionModel, GridPaginationModel } from "@mui/x-data-grid";

interface DataTableProps<RowType> {
  rows: RowType[];
  columns: GridColDef[];
  height?: string;
  width?: string;
  onSelectionModelChange?: (newSelectionModel: GridRowSelectionModel) => void;
  selectionModel?: GridRowSelectionModel;
  // New pagination props
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  rowCount?: number;
  loading?: boolean;
  checkboxSelection?: boolean; // Added checkboxSelection prop
}

function DataTableComponent<RowType>({
  columns,
  rows,
  height,
  width,
  onSelectionModelChange,
  selectionModel,
  // New pagination props
  paginationModel,
  onPaginationModelChange,
  rowCount,
  loading = false,
  checkboxSelection = false, // Default to false
}: DataTableProps<RowType>) {
  return (
    <div style={{ height: height, width: width, overflow: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={checkboxSelection} // Use the prop here
        disableRowSelectionOnClick
        rowHeight={50}
        columnHeaderHeight={50}
        onRowSelectionModelChange={onSelectionModelChange}
        rowSelectionModel={selectionModel}
        loading={loading}
        
        // Server pagination config
        paginationMode="server"
        paginationModel={paginationModel || { page: 0, pageSize: 10 }}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[5, 10, 25, 50]}
        rowCount={rowCount || 0}
        
        // Added properties for horizontal scrolling and preventing column shrinking
        disableColumnMenu
        autoHeight={false}
        sx={{
          "& .MuiDataGrid-root": {
            fontSize: "12px", // General font size for the grid
            fontFamily: "Montserrat",
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "12px", // Font size for the header row
            backgroundColor: "#EFF8FF",
            fontFamily: "Montserrat",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "12px", // Font size for individual cells
            fontFamily: "Montserrat",
          },
          // Prevent column shrinking
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: "150px",
          },
          // Enable horizontal scrolling
          "& .MuiDataGrid-main": {
            overflow: "auto",
          },
          // Remove unnecessary pagination border
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
        }}
      />
    </div>
  );
}

export default DataTableComponent;
