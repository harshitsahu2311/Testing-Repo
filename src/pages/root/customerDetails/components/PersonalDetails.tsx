import { TextField } from "@mui/material";
import { CloudDownloadOutlined as DownloadIcon } from "@mui/icons-material";

interface PersonalDetailsProps {
  customerData: {
    data: any;
    message?: string;
    errors?: null | any;
    code?: string;
  } | null;
}

const PersonalDetails = ({ customerData }: PersonalDetailsProps) => {
  const customer = customerData?.data;

  return (
    <div className="w-full px-0 py-6">
      {/* Form Section */}
      <div className="grid grid-cols-3 gap-4 text-xs">
        <TextField
          label="First Name"
          value={customer?.first_name || ""}
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" }, // Adjust input text size
          }}
          InputLabelProps={{
            style: { fontSize: "14px" }, // Adjust label text size
          }}
          className="text-xs"
        />
        <TextField
          label="Middle Name"
          value={customer?.middle_name || ""}
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" },
          }}
          InputLabelProps={{
            style: { fontSize: "14px" },
          }}
        />
        <TextField
          label="Last Name"
          value={customer?.last_name || ""}
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" },
          }}
          InputLabelProps={{
            style: { fontSize: "14px" },
          }}
        />

        <TextField
          label="Contact no"
          value={customer?.phone || ""}
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" },
          }}
          InputLabelProps={{
            style: { fontSize: "14px" },
          }}
        />
        <TextField
          label="Email"
          value={customer?.email || ""}
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" },
          }}
          InputLabelProps={{
            style: { fontSize: "14px" },
          }}
        />
        <TextField
          label="Gender"
          value={customer?.gender || ""}
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" },
          }}
          InputLabelProps={{
            style: { fontSize: "14px" },
          }}
        />

        <TextField
          label="DOB"
          value={
            customer?.date_of_birth
              ? new Date(customer.date_of_birth).toLocaleDateString()
              : ""
          }
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" },
          }}
          InputLabelProps={{
            style: { fontSize: "14px" },
          }}
        />
        <TextField
          label="License number"
          value={customer?.license || ""}
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" },
          }}
          InputLabelProps={{
            style: { fontSize: "14px" },
          }}
        />
        <TextField
          label="Address"
          value={customer?.address || ""}
          variant="standard"
          InputProps={{
            readOnly: true,
            style: { fontSize: "14px" },
          }}
          InputLabelProps={{
            style: { fontSize: "12px" },
          }}
          className="col-span-3"
        />
      </div>

      {/* Document Section */}
      <div className="grid grid-cols-3 gap-8 mt-[6rem]">
        {customer?.documents?.map((doc: any, index: any) => (
          <div key={index} className="flex items-center">
            <TextField
              label={`Document ${index + 1}`}
              value={doc.file_name || ""}
              variant="standard"
              InputProps={{
                readOnly: true,
                style: { fontSize: "14px" },
              }}
              InputLabelProps={{
                style: { fontSize: "14px" },
              }}
              className="flex-1"
            />
            <a
              href={doc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4"
            >
              <DownloadIcon className="text-gray-500 cursor-pointer" />
            </a>
          </div>
        ))}

        {(!customer?.documents || customer.documents.length === 0) && (
          <div className="col-span-3 text-center text-gray-500">
            No documents available
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
