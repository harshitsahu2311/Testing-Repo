
export interface TicketData {
  id: string;
  profileImage?: string;
  userName: string;
  date: string;
  ticketId: string;
  description: string;
  tags: Array<{
    text: string;
    variant?: "default" | "muted" | "primary" | "secondary";
    className?: string;
  }>;
}

export const mockTickets: TicketData[] = [
  {
    id: "1",
    userName: "Prabodhan Fitzgerald",
    date: "23-05-2000",
    ticketId: "W3400GHP",
    description: "Enjoy a special limited-time offer with our exclusive coupon! Get 25% off on your next ride, up to a maximum discount of $15.",
    tags: [
      {
        text: "New",
        variant: "default",
      },
      {
        text: "Bike Taxi Customer",
        variant: "primary",
      },
      {
        text: "Asset Department",
        variant: "muted",
      },
    ],
  },
  {
    id: "2",
    userName: "Prabodhan Fitzgerald",
    date: "23-05-2000",
    ticketId: "W3400GHP",
    description: "Enjoy a special limited-time offer with our exclusive coupon! Get 25% off on your next ride, up to a maximum discount of $15.",
    tags: [
      {
        text: "New",
        variant: "default",
      },
      {
        text: "Bike Taxi Customer",
        variant: "primary",
      },
      {
        text: "Asset Department",
        variant: "muted",
      },
    ],
  },
  {
    id: "3",
    userName: "Sarah Johnson",
    date: "15-06-2023",
    ticketId: "J8275KLM",
    description: "The bike I rented has issues with the brakes. Please assist immediately as this is a safety concern.",
    tags: [
      {
        text: "Urgent",
        variant: "default",
      },
      {
        text: "Rental Customer",
        variant: "primary",
      },
      {
        text: "Technical Department",
        variant: "muted",
      },
    ],
  },
  {
    id: "4",
    userName: "Michael Chen",
    date: "02-07-2023",
    ticketId: "P9431RTY",
    description: "I was charged twice for my last rental. Please review my account and process a refund for the duplicate charge.",
    tags: [
      {
        text: "Billing",
        variant: "default",
      },
      {
        text: "Regular Customer",
        variant: "primary",
      },
      {
        text: "Finance Department",
        variant: "muted",
      },
    ],
  },
];

export interface TicketIssueData {
  title: string;
  statuses: { label: string; color?: string; className?: string }[];
  user: {
    name: string;
    date?: string;
    avatarText?: string;
  };
  message: string;
  attachments: { name: string; size: string }[];
  replyTo: {
    role: string;
    removable: boolean;
    onRemove: () => void;
  };
}

export const mockTicketIssue: TicketIssueData = {
  title: "Issue with the bike",
  statuses: [
    { label: "Open", color: "blue", className: "bg-[#BFEAF8] text-[#007DA7]" },
    { label: "Rental Customer", color: "pink", className: "bg-[#FFDADA] text-[#FF0000]" },
    { label: "Asset Department", color: "red", className: "bg-[#FFDADA] text-[#FF0000]" },
  ],
  user: {
    name: "Prabodhan Fitzgerald",
    date: "23-05-2000",
    avatarText: "P"
  },
  message: "Enjoy a special limited-time offer with our exclusive coupon! Get 25% off on your next ride, up to a maximum discount of $15.",
  attachments: [
    { name: "document_file.pdf", size: "100kb" },
    { name: "document_file.pdf", size: "100kb" }
  ],
  replyTo: {
    role: "Asset Manager",
    removable: true,
    onRemove: () => {}
  }
};

export interface TicketInfoData {
  title: string;
  fields: {
    label: string;
    value: string;
    action?: {
      text: string;
      onClick: () => void;
    };
  }[];
  avatarText: string;
  dropdownOptions: {
    label: string;
    value: string;
  }[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
  actionButton: {
    text: string;
    onClick: () => void;
  };
}

export const mockTicketInfo: TicketInfoData = {
  title: "Information",
  fields: [
    { label: "Ticket ID", value: "W3400GHP" },
    { label: "Email", value: "name@email.com" },
    { label: "Phone", value: "9434652922" },
    { 
      label: "Location", 
      value: "place", 
      action: { 
        text: "view map", 
        onClick: () => console.log("View map clicked")
      } 
    },
  ],
  avatarText: "N",
  dropdownOptions: [
    { label: "Asset manager", value: "asset-manager" },
    { label: "Support agent", value: "support-agent" },
    { label: "Administrator", value: "administrator" },
  ],
  selectedOption: "asset-manager",
  onOptionChange: (value: string) => console.log("Option changed:", value),
  actionButton: {
    text: "RESOLVED",
    onClick: () => console.log("Resolved clicked")
  }
};
