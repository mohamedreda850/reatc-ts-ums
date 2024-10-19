import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export default function Home() {
  const [carts, setCarts]: any = useState([]);
  const [total, setTotal]: any = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  async function getCarts() {
    try {
      const { data } = await axios.get(`https://dummyjson.com/carts`);
      setCarts(data?.carts);
      setTotal(data?.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCarts();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center m-5">
            <h3 className="font-bold">Today's sales</h3>
          </div>
          <hr className="mx-5 mt-5" />
          <div className="p-[2%] bg-gradient-to-r from-[#FEAF00] to-[#F8D442]">
            {" "}
            <h1 className="text-2xl text-white">total sales: {total}</h1>
            <div className="grid  p-2 ">
              {carts.map((cart: any, index: number) => (
                <div key={index}>
                  <h1 className="text-white my-2">cart id : {cart.id}</h1>
                  <div className=" pb-5 grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3  gap-4">
                    {cart.products.map((product: any, index: number) => (
                      <div
                        key={index}
                        className="p-2 bg-white shadow-lg rounded-lg"
                      >
                        <h2 className="text-xl">
                          Product Name:{" "}
                          <span className="text-gray-500 text-lg">
                            {product.title}
                          </span>
                        </h2>
                        <h2 className="text-xl">
                          Product Price:{" "}
                          <span className="text-gray-500 text-lg">
                            {product.price}
                          </span>
                        </h2>
                        <h2 className="text-xl">
                          Quantity:{" "}
                          <span className="text-gray-500 text-lg">
                            {product.quantity}
                          </span>
                        </h2>
                        <h2 className="text-xl">
                          Total:{" "}
                          <span className="text-gray-500 text-lg">
                            {product.total}
                          </span>
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}
