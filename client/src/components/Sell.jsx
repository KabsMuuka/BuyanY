import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uploadImage } from "../action/actionCreators";
import { profile } from "../action/actionCreators";

const sellProduct = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [Iserror, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  //profile
  const currentUserProfile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(profile());
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("Selected file:", file); // Check if the file is being captured
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //upload image to the server
  const uploadToServer = async (e) => {
    e.preventDefault();
    if (!image || !price || !title || !description || !location) {
      setShowError(true); //show
      setError("Some fields can't be empty.");

      setTimeout(() => {
        setShowError(false); //hide
      }, 2000);
      return;
    }
    const formData = new FormData();
    formData.append("userNumber", currentUserProfile.phoneNumber);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("location", location);

    //show bar
    setShowProgress(true);
    setTimeout(() => {
      setShowProgress(false);
      dispatch(uploadImage(formData));
    }, 2000);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            {/* Back Button */}
            <Link className="flex items-center mb-4" to={"/dashboard"}>
              <img className="w-4" src="/back.png" alt="back button" />
              <span className="ml-2 text-sm text-blue-500">
                Back to Dashboard
              </span>
            </Link>

            <div className="flex justify-center">
              {showProgress && <progress className="progress w-56"></progress>}
            </div>
            <p className="text-center font-bold text-red-600">
              {showError && Iserror}
            </p>

            <p className="text-lg font-semibold text-center mb-6">
              Add Item to Sell
            </p>

            <div className="flex flex-col gap-4">
              {/* File Input */}
              <form>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="border p-2 w-full rounded-md"
                  />

                  {/* Image Preview */}
                  {previewUrl && (
                    <div className="mt-6 text-center">
                      <p className="font-medium mb-2">
                        Uploaded Image Preview:
                      </p>
                      <img
                        className="w-1/2 mx-auto rounded-md shadow-md"
                        src={previewUrl}
                        alt="preview"
                      />
                    </div>
                  )}
                </div>

                {/* title Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 w-full rounded-md"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* price Input  */}
                <div>
                  <input
                    type="text"
                    placeholder="Price"
                    className="border p-2 w-full rounded-md"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                {/* description Input  */}
                <div>
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="border p-2 w-full rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    maxLength={500}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="location"
                    className="border p-2 w-full rounded-md"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <button
                  onClick={uploadToServer}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-blue-600 transition"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Please login</p>
        </div>
      )}
    </>
  );
};

export default sellProduct;
