interface ProfileIconProps {
  color?: string;
}
const ProfileIcon = ({ color = "#4C4C66" }: ProfileIconProps) => {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="profile-2user 1">
        <g id="Group">
          <path
            id="Vector"
            d="M8.00002 10.9996C7.91069 10.9895 8.09828 10.9895 8.00002 10.9996C6.97472 10.9601 5.71198 10.8385 5.00002 9.99962C4.28806 9.16069 3.99711 8.16481 4.00002 6.99962C4.00002 4.51391 5.80255 1.99962 8.00002 1.99962C9.05073 1.97809 10.2437 2.17099 11 2.99962C11.7564 3.82824 11.9811 4.80624 12 5.99962C12.019 7.193 11.7296 9.14055 11 9.99962C10.2705 10.8587 9.05073 10.9781 8.00002 10.9996Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            opacity="0.4"
            d="M15.0001 4C16.6034 4 18.0001 6.07 18.0001 8C18.0001 9.89 16.5456 10.93 15.0001 11C14.9287 10.99 15.0715 10.99 15.0001 11"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_3"
            d="M4.00035 14C1.69389 15.503 1.69389 18.5062 4.00035 20C6.62131 21.7071 10.3794 21.7071 13.0003 20C15.3068 18.4969 15.3068 15.4937 13.0003 14C10.3889 12.3021 6.63084 12.3021 4.00035 14Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_4"
            opacity="0.4"
            d="M17 20C17.6901 19.85 18.4633 19.43 19 19C20.4952 17.83 20.4952 16.17 19 15C18.4728 14.58 17.6805 14.16 17 14"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default ProfileIcon;
