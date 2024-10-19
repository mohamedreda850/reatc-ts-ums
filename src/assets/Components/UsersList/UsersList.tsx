import { useState, useEffect } from 'react';
import { Bounce, toast } from "react-toastify";
import Loader from './../Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LuPencil } from "react-icons/lu";
import { SlTrash } from "react-icons/sl";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  function handelShow(user: any) {
    setOpenModal(true);
    setUserId(user.id);
    setUserData(user);
  }

  function navigateToAddUser() {
    navigate("/dashboard/add-user");
  }

  async function getUsers() {
    try {
      const res = await axios.get(`https://dummyjson.com/users`);
      setUsers(res?.data?.users);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteUser() {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`);
      setOpenModal(false);
      toast.success("User is deleted successfully !", {
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        transition: Bounce,
      });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="w-full bg-[#f8f8f8] py-4">
          <div className="flex justify-between items-center m-5">
            <h3 className="font-bold">User List</h3>
            <button
              onClick={navigateToAddUser}
              className="font-medium text-sm px-5 bg-[#FEAF00] py-2 rounded-sm"
            >
              Add New User
            </button>
          </div>
          <hr className="m-5" />

          <div className="relative overflow-x-auto m-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#ACACAC] uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {"       "}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Enroll Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of admission
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {"       "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, idx: number) => (
                  <tr key={idx} className="bg-white border-8 border-[#f8f8f8]">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img src={user.image} className="w-1/3" alt="" />
                    </th>
                    <td className="px-6 py-4">{user.firstName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.ein}</td>
                    <td className="px-6 py-4">{user.birthDate}</td>
                    <td className=" ">
                      <Link to={`/dashboard/updtae-user/${user.id}`}>
                      <LuPencil 
                        size={17}
                        color="#FEAF00"
                        className="inline mx-2 cursor-pointer"
                      /></Link>
                      <SlTrash
                        onClick={() => handelShow(user)}
                        size={17}
                        color="#FEAF00"
                        className="inline mx-2 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal
              show={openModal}
              size="md"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete {userData?.firstName}{" "}
                    {userData?.lastName}?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => deleteUser()}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </section>
      )}
    </>
  );
}
