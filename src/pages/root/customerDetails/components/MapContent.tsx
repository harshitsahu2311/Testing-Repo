// import RideMap from "@/assets/png/RideMap.png";
function MapContent() {
  return (
    <div className="flex items-center justify-center left-9">
      {/* <div> */}
      {/* <img src={RideMap} alt="map"></img> */}
      <div className="flex items-center justify-center">
        <div className="w-[230px] bg-red-500"></div>
        <p className="text-[#b6b6b6] text-[12px] left-28">
          No real time rides going on
        </p>
      </div>
      {/* </div> */}
    </div>
  );
}

export default MapContent;
