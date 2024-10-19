import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
interface userFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phoneNumber: string;
  birthData: string;
}
export default function AddUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormData>();
  const onSubmit: SubmitHandler<userFormData> = async (data) => {
    try {
      await axios.post(`https://dummyjson.com/users/add`, data);

      toast.success("User is added successfully !");
      navigate("/dashboard/users-list");
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };
  return (
    <>
      <section className="w-full h-screen bg-[#f8f8f8] py-2">
        <div className="flex justify-between items-center m-5">
          <h3 className="font-bold">Add user</h3>
        </div>
        <hr className="m-5" />
        <div className=" p-6 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-xl bg-white rounded-xl m-3 p-5 grid grid-cols-1 lg:grid-cols-2 gap-7 "
          >
            <div className="mb-5 ">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                className=" bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500">
                  {" "}
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="mb-5 ">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                className=" bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <span className="text-red-500"> {errors.lastName.message}</span>
              )}
            </div>
            <div className="mb-5 ">
              <label
                htmlFor="Email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="text"
                id="Email"
                placeholder="Enter Email"
                className=" bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "enter valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500"> {errors.email.message}</span>
              )}
            </div>
            <div className="mb-5 ">
              <label
                htmlFor="Age"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Age
              </label>
              <input
                type="number"
                id="Age"
                placeholder="Enter Age"
                className=" bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("age", {
                  required: "Age is required",
                  max: { value: 50, message: "Max age is 50" },
                })}
              />
              {errors.age && (
                <span className="text-red-500"> {errors.age.message}</span>
              )}
            </div>
            <div className="mb-5 ">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone Number{" "}
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter Phone Number"
                className=" bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
              />
              {errors.phoneNumber && (
                <span className="text-red-500">
                  {" "}
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="mb-5 ">
              <label
                htmlFor="birthData"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Birth Data
              </label>
              <input
                type="date"
                id="birthData"
                placeholder="Enter Birth Data"
                className=" bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("birthData", {
                  required: "Birth Data is required",
                })}
              />
              {errors.birthData && (
                <span className="text-red-500">
                  {" "}
                  {errors.birthData.message}
                </span>
              )}
            </div>
            <div className="lg:col-span-2 flex justify-center mt-5">
              <button className="text-white bg-[#FEAF00] px-5 py-2 rounded w-[30%]">
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
