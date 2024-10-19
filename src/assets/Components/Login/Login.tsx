import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { authContext } from "../Context/AuthContext";

interface LoginFormInput {
  username: string;
  password: string;
}
export default function Login() {
  localStorage.removeItem("user");
  const { saveUserData }: any = useContext(authContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  let onSubmit: SubmitHandler<LoginFormInput> = async (data: any) => {
    try {
      const response = await axios.post(
        `https://dummyjson.com/auth/login`,
        data
      );
      localStorage.setItem("user", response?.data?.accessToken);
      saveUserData();
      navigate("/dashboard");
      toast.success("Login is successful !", {
        transition: Bounce,
      });
    } catch (error) {
      toast("Login is Failed", {
        transition: Bounce,
      });
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#FEAF00] to-[#F8D442] flex justify-center items-center">
      <div className=" bg-white m-3 p-8 rounded-md ">
        <div className="p-2 border-l-4 border-[#F8D442]">
          <h3 className="font-bold text-2xl pl-2">User Management System</h3>
        </div>
        <div className="flex flex-col items-center my-6 text-center">
          <h4 className="font-semibold text-[22px] ">Sign In</h4>
          <p className="text-[#6C6C6C] font-normal">
            Enter your credentials to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mx-auto w-full p-[5%]"
        >
          <div className="mb-5">
            <label
              htmlFor="UserName"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              User Name
            </label>
            <input
              type="text"
              id="UserName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your user Name"
              {...register("username", { required: "username is required" })}
            />
            {errors.username && (
              <span className="text-red-600">{errors.username.message}</span>
            )}
          </div>
          <div className="mb-5 ">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              {...register("password", { required: "password is required" })}
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-[#FEAF00] 0 focus:ring-4 focus:outline-none f font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
