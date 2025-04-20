const Greetings = () => {
  const currentHour = new Date().getHours();
  let greeting = "Good Evening";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  }

  return (
    <>
      <div className="flex flex-col">
        <h3 className="color-[#020126] text-xs md:text-sm lg:text-md xl:text-lg tracking-light font-[400]">
          Hello Customer Manager Admin,
        </h3>
        <h2 className="color-[#020126] text-sm md:text-md lg:text-lg xl:text-xl tracking-light font-[700]">
          {greeting}!
        </h2>
      </div>
    </>
  );
};

export default Greetings;
