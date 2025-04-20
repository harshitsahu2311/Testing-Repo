import InputField from "@/components/InputField/InputField";

interface PasswordChangeFormProps {
  handlePasswordChange: () => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  error: string;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  handlePasswordChange,
  setPassword,
  setConfirmPassword,
  error,
}) => {
  return (
    <div>
      <p className="border-b mb-8 text-[24px] font-normal">
        Change The Password
      </p>
      <div className="flex flex-col w-[480px]">
        <div className="mb-5">
          <InputField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <InputField
            label="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="text-white bg-darkblue py-[8px] text-[14px] font-medium rounded"
          onClick={handlePasswordChange}
        >
          CHANGE PASSWORD
        </button>
      </div>
      {error && <p className="text-sm text-red-100 rounded-md p-2">{error}</p>}
    </div>
  );
};

export default PasswordChangeForm;
