import UploadFileIcon from "@mui/icons-material/UploadFile";
export interface AttachmentProps {
  key: string | number;
  name: string;
  size: string;
  url?: string;
}

const Attachment: React.FC<AttachmentProps> = ({ key, name, size, url }) => {
  return (
    <div
      key={key}
      className="flex items-center p-2 bg-[#ededed] rounded-md text-sm"
    >
      <UploadFileIcon className="h-4 w-4  text-[#007DA7] mr-2" />
      <div>
        <div className="font-medium text-gray-700">{name}</div>
        <div className="text-xs text-gray-500">{size}</div>
      </div>
      <a
        href={url || "#"}
        download
        className={`ml-3 ${!url ? "pointer-events-none opacity-50" : ""}`}
        onClick={(e) => !url && e.preventDefault()}
      ></a>
    </div>
  );
};

export default Attachment;
