import { useState } from "react";
import { API_URL } from "../config";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image); // 이대로 올리면 그냥 미디어 라이브러리에 업로드되고 각 이벤트에 연결되지 않는다.
    formData.append("ref", "events"); // 연결되는 collection
    formData.append("refId", evtId); // 연결되는 이벤트 id
    formData.append("field", "image"); // 연결되는 collection

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      imageUploaded();
    }
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    // console.log(e.target.file[0]);
  };
  return (
    // <div className=" items-center">
    //   <h2 className="">Upload Event Image</h2>
    //   <form action="" className="flex justify-center items-center w-96">
    //     <div>
    //       <input type="file" onChange={handleFileChange} />
    //     </div>
    //     <input type="submit">submit</input>
    //   </form>
    // </div>
    <div className="space-y-6 items-center">
      <h2>Upload Event Image</h2>
      <form
        className="flex justify-center items-center w-96"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-6 w-full">
          <div className="">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-none border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  className="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              value="Upload"
              className="btn btn--light mt-6 text-center flex"
            >
              Upload &rarr;
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
