interface TicketsProps {
  color?: string;
}

const Tickets = ({ color = "#020126" }: TicketsProps) => {
  return (
    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.77554 10.7511C8.6797 10.7415 8.5647 10.7415 8.45929 10.7511C7.35932 10.7138 6.31707 10.2497 5.55327 9.45732C4.78946 8.6649 4.36408 7.60629 4.3672 6.50569C4.3672 4.15778 6.2647 2.25069 8.6222 2.25069C9.74943 2.23036 10.8386 2.65865 11.65 3.44134C12.4615 4.22403 12.9287 5.29701 12.9491 6.42423C12.9694 7.55146 12.5411 8.64059 11.7584 9.45204C10.9757 10.2635 9.90276 10.7308 8.77554 10.7511Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M15.7261 4.16797C17.5853 4.16797 19.0803 5.67255 19.0803 7.52214C19.0803 9.33339 17.6428 10.8092 15.8507 10.8763C15.768 10.8667 15.6843 10.8667 15.6016 10.8763"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.98547 14.288C1.6663 15.8405 1.6663 18.3705 3.98547 19.9134C6.62089 21.6767 10.943 21.6767 13.5784 19.9134C15.8976 18.3609 15.8976 15.8309 13.5784 14.288C10.9526 12.5342 6.63047 12.5342 3.98547 14.288Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M18 19.084C18.69 18.9402 19.3417 18.6623 19.8783 18.2502C21.3733 17.129 21.3733 15.2794 19.8783 14.1582C19.3512 13.7557 18.7092 13.4873 18.0288 13.334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Tickets;
