import {
  Box,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

// Define the interface for the Table component
interface TableProps {
  rows: any[];
  columns: GridColDef[];
  onPageSizeChange: (newPageSize: number) => void;
  pageSize: number;
  page: number;
  onPageChange: (newPage: number) => void;
  totalRows: number;
  onRowSelectionModelChange?: (
    newSelectionModel: GridRowSelectionModel
  ) => void;
  loading?: boolean;
  columnHeaderHeight?: number;
  autoHeight?: boolean;
  checkboxSelection?: boolean; // Added checkboxSelection prop
}

const Table = ({
  rows,
  columns,
  onPageSizeChange,
  pageSize,
  page,
  onPageChange,
  totalRows,
  onRowSelectionModelChange,
  loading = false,
  columnHeaderHeight,
  autoHeight,
  checkboxSelection = false, // Default to false
}: TableProps) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalRows / pageSize);

  // Handle pagination change
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1); // Convert to zero-based for the handler
  };

  // Handle page size change
  const handlePageSizeChange = (event: any) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <Box>
      <Box sx={{ minHeight: "300px", position: "relative" }}>
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : rows.length === 0 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography variant="body1" color="textSecondary">
              No rows available
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnFilter
            disableColumnMenu
            rowCount={rows.length}
            loading={loading}
            autoHeight={autoHeight}
            columnHeaderHeight={columnHeaderHeight}
            checkboxSelection={checkboxSelection} // Use the prop here
            onRowSelectionModelChange={onRowSelectionModelChange}
            pageSizeOptions={[pageSize]}
            paginationMode="server"
            hideFooter={true}
            sx={{
              height: "350px",
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
        )}
      </Box>

      {/* Pagination Controls */}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        my={1}
        px={2}
      >
        <Box display="flex" alignItems="center" mr={2}>
          <Typography variant="body2">
            Showing {page * pageSize + 1}-
            {Math.min((page + 1) * pageSize, totalRows)} of {totalRows}
          </Typography>
          <FormControl
            variant="outlined"
            size="small"
            sx={{ ml: 2, minWidth: 80 }}
          >
            <Select
              id="page-size-select"
              value={pageSize}
              onChange={handlePageSizeChange}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { border: "none" }, // Remove border
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Pagination
          count={totalPages}
          page={page + 1} // Convert from zero-based to one-based for Pagination component
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default Table;
