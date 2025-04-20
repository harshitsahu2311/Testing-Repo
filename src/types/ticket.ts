
export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export const formatTicketStatus = (status: string): string => {
  switch (status) {
    case TicketStatus.OPEN:
      return 'Open';
    case TicketStatus.IN_PROGRESS:
      return 'In Progress';
    case TicketStatus.RESOLVED:
      return 'Resolved';
    case TicketStatus.CLOSED:
      return 'Closed';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};
