import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../action/actionCreators";
import { useNavigate } from "react-router-dom";
import { profile } from "../action/actionCreators";
const view = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [sellerId, setSellerId] = useState("");

  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.profile);
  const post = useSelector((state) => state.fetchPost);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const gadgetId = localStorage.getItem("gadgetId");
  const itemId = Number(gadgetId);

  const clickedItem = post.image.filter((img) => img.id === itemId);

  // useEffect(() => {
  //   if (clickedItem && currentUser) {
  //     const IsSeller_id = clickedItem.some(
  //       (product) =>
  //         Number(product.userNumber) === Number(currentUser.phoneNumber)
  //     );
  //     setSellerId(IsSeller_id);
  //   }
  // }, [clickedItem, currentUser]);

  console.log("sellerId", currentUser);
  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>Show click product</h1>
          {clickedItem ? (
            clickedItem.map((img) => {
              return (
                <div
                  key={img.id}
                  className="grid grid-cols-1 sm:grid-cols-2 items-start gap-6 shadow border p-4 rounded-md "
                >
                  {/* Image Section */}
                  <div className="flex justify-center">
                    <img
                      src={img.url}
                      alt="image"
                      className="w-full sm:w-3/4 rounded-md object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-semibold text-gray-700">
                      Title
                    </label>
                    <p className="shadow border rounded-md p-3 text-gray-600 leading-relaxed">
                      {img.title}
                    </p>
                    <label className="block text-lg font-semibold text-gray-700">
                      Description
                    </label>
                    <p className="shadow border rounded-md p-3 text-gray-600 leading-relaxed">
                      {img.description}
                    </p>
                    <label className="block text-lg font-semibold text-gray-700">
                      Location
                    </label>
                    <p className="text-gray-700 font-medium">{img.location} </p>

                    {/* Contact Seller Section if buyer hide contact*/}
                    {currentUser.userRole === "Seller" ? (
                      <p> </p>
                    ) : (
                      <button
                        onClick={() => {
                          navigate("/chatroom", {
                            state: { sellers_id: img.userNumber },
                          });
                        }}
                        className="text-blue-600 underline cursor-pointer hover:text-blue-800"
                      >
                        Contact the seller
                      </button>
                    )}

                    {/* Buy Button */}
                    <div>
                      <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-md transition">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p> No image to show</p>
          )}
        </div>
      ) : (
        <div> Please login </div>
      )}
    </>
  );
};

export default view;
