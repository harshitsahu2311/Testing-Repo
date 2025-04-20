import { Avatar, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Picker from "emoji-picker-react";
import Attachment from "@/components/attachments";
import { TicketComment } from "@/hooks/useTickets";
import CloseIcon from "@mui/icons-material/Close";

export type Attachment = {
  name: string;
  size: string;
  url?: string;
};

export type TicketStatus = "open" | "closed" | "pending" | "resolved" | string;

export interface TicketDetailViewProps {
  title: string;
  description: string;
  statuses?: { label: string; color?: string; className?: string }[];
  user: {
    name: string;
    avatar?: string;
    date?: string;
    avatarText?: string;
  };
  message?: string;
  attachments?: Attachment[];
  replyTo?: {
    role: string;
    removable?: boolean;
    onRemove?: () => void;
  };
  replyMessage?: string;
  onSendReply?: (message: string) => void;
  className?: string;
  comments?: TicketComment[];
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({
  title,
  statuses = [],
  user,
  description,
  attachments = [],
  replyTo,
  replyMessage = "",
  onSendReply,
  className,
  comments = [],
}) => {
  const [reply, setReply] = useState(replyMessage);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSendReply = () => {
    if (reply.trim() && onSendReply) {
      console.log("Message sent:", reply); // Log the message when Send is clicked
      onSendReply(reply);
      setReply("");
      setFiles([]);
    }
  };

  const onEmojiClick = (event: any) => {
    setReply((prevReply) => prevReply + event.emoji);
    setOpenEmoji(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      setFiles((prevFiles) => [...prevFiles, newFile]);
      e.target.value = ""; // Reset input
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Format date for comments
  const formatCommentDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${
        className || ""
      }`}
    >
      <div className="p-3 border-b border-[#F0F0F0]">
        <h3 className="text-sm font-bold">{title}</h3>

        {statuses.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {statuses.map((status, index) => (
              <div
                key={index}
                className={`px-3 py-1 text-xs font-medium rounded-full ${status.className}`}
              >
                {status.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full border-t border-t-[#F1F1F1] bg-white p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar sx={{ width: "32px", height: "32px" }}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-full object-cover"
                />
              ) : (
                user.name.charAt(0)
              )}
            </Avatar>
            <div>
              <h3 className="font-medium text-xs text-gray-900">{user.name}</h3>
              {user.date && (
                <p className="text-[10px] text-gray-500">{user.date}</p>
              )}
            </div>
          </div>
        </div>

        {description && (
          <p className="mb-3 text-xs text-gray-800">{description}</p>
        )}

        {attachments.length > 0 && (
          <div className="mt-2">
            <div className="text-xs text-gray-500 mb-2">
              {attachments.length} Attachment
              {attachments.length !== 1 ? "s" : ""}
            </div>
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment, index) => (
                <Attachment
                  key={`attachment-${index}`}
                  name={attachment.name}
                  url={attachment.url}
                  size={attachment.size}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comments section */}
      {comments && comments.length > 0 && (
        <div className="border-t border-t-[#F1F1F1] px-3 py-2">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Comments</h4>
          <div className="space-y-3 max-h-[200px] overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={index} className="bg-[#F8F8F8] p-2 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium">
                    {comment.createdBy}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {formatCommentDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-gray-800">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {replyTo && (
        <div className="p-3">
          <div className="rounded-lg p-2 flex flex-col bg-[#F8F8F8]">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 text-xs p-2 outline-none resize-none min-h-[60px] bg-transparent rounded-md"
            />

            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <Attachment
                      key={`file-${index}`}
                      name={file.name}
                      size={`${Math.round(file.size / 1024)}kb`}
                    />
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      <CloseIcon
                        fontSize="small"
                        className="text-red-100 rounded-full"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mt-2 gap-2">
              <div className="flex items-center">
                <IconButton
                  size="small"
                  onClick={() => setOpenEmoji(!openEmoji)}
                  className="text-gray-500 hover:text-gray-700 relative"
                >
                  <TagFacesIcon fontSize="small" />
                  {openEmoji && (
                    <div className="absolute bottom-full left-0 mb-2 z-50">
                      <Picker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                </IconButton>

                <IconButton
                  size="small"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <AttachFileIcon fontSize="small" />
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </IconButton>
              </div>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2196F3",
                  color: "white",
                  textTransform: "none",
                  fontSize: "12px",
                }}
                className="flex items-center gap-1 px-4 py-1 text-xs"
                onClick={handleSendReply}
                disabled={!reply.trim()}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailView;
