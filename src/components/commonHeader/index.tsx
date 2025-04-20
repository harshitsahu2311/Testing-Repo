import Greetings from "@/components/greeting";
import BrandLogo from "@/assets/png/webknotLogo.png";

const CommonHeader = () => {
  return (
    <>
      <div>
        <Greetings />
      </div>
      <div>
        <img src={BrandLogo} alt="brand-logo"></img>
      </div>
    </>
  );
};

export default CommonHeader;
