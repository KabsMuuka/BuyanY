import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../action/actionCreators";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.fetchPost);

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const addToCart = () => {
    aler("gadget added to cart");
  };
  const buyThis = () => {};

  console.log("isAuthenticated", isAuthenticated);
  console.log("accesToken", accessToken);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 shadow">
            {posts && posts.image && posts.image.length > 0 ? (
              posts.image.map((img) => (
                <div key={img.id} className="border p-2">
                  <div className="w-full h-60 bg-gray-200">
                    <img
                      className="w-full h-full object-cover rounded-sm"
                      src={img.url}
                      alt={img.originalName}
                    />
                  </div>
                  <div className="shadow">
                    <p className="block text-lg font-semibold text-gray-700">
                      {img.title}
                    </p>
                    <p className=" text-1xl truncate text-green-500">
                      K{img.price}
                    </p>
                    <p className="text-sm">{img.location}</p>
                    <p className="text-sm">{img.userNumber}</p>
                  </div>

                  <button onClick={addToCart} className="text-blue-600 mt-2">
                    Watch list
                  </button>

                  <br />
                  <button
                    onClick={() => {
                      localStorage.setItem("gadgetId", img.id);
                    }}
                    className="text-blue-600 underline"
                  >
                    <Link to={"/view"}> view </Link>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center w-full col-span-full">No Posts found</p>
            )}
          </div>{" "}
        </div>
      ) : (
        <div>
          <p className="text-center">Please login </p>

          <Link to={"/"} className="bg-red-400 w-20 p-1 rounded-md mt-3">
            back
          </Link>
        </div>
      )}
    </>
  );
};

export default Dashboard;
