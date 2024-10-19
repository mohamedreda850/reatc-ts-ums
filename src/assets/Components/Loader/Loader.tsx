
import { Hourglass } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#FEAF00", "#FEAF00"]}
      />
    </div>
  );
}
