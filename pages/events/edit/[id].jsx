import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { API_URL } from "@/config/index";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditEventPage({ event }) {
  const {
    title,
    organizer,
    image,
    venue,
    address,
    date,
    time,
    description,
    slug,
  } = event.attributes;

  const router = useRouter();
  const [values, setValues] = useState({
    title: title,
    address: address,
    venue: venue,
    date: date,
    time: time,
    organizer: organizer,
    description: description,
    slug: slug,
    image: image,
  });

  const [imagePreview, setImagePreview] = useState(
    image.data ? image.data.attributes.formats.thumbnail.url : null
  );
  useEffect(() => {}, [imagePreview]);

  // * 모달
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("object");
    // * 유효성검사
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("정보를 입력해주세요.");
    }

    // * 폼 POST
    const res = await fetch(`${API_URL}/api/events`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: values }),
    });
    if (!res.ok) {
      toast.error("에러에러에러");
    } else {
      const evt = await res.json();
      console.log(evt);
      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New event">
      <div className="max-w-5xl mx-auto space-y-8 h-70v">
        <div className="flex justify-between items-center">
          <h1>이벤트 수정하기</h1>
          <ToastContainer />
          <button type="submit" className="btn btn--lg" onClick={handleSubmit}>
            업데이트
          </button>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="event-add py-6 justify-center "
        >
          <div className="add-form flex flex-col space-y-8">
            <div className="add-form__input">
              <label htmlFor="title">이벤트 이름</label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleInputChange}
                className="input--1"
              />
            </div>
            <div className="input col-span-1">
              <label htmlFor="address">행사 위치</label>
              <input
                type="text"
                id="address"
                name="address"
                value={values.address}
                onChange={handleInputChange}
                className="input--1"
              />
            </div>
            <div className="input">
              <label htmlFor="venue">행사장</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={values.venue}
                onChange={handleInputChange}
                className="input--1"
              />
            </div>
            <div className="input">
              <label htmlFor="organizer">주최</label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={values.organizer}
                onChange={handleInputChange}
                className="input--1"
              />
            </div>
            <div className="input">
              <label htmlFor="date">일시</label>
              <input
                type="date"
                id="date"
                name="date"
                value={values.date}
                onChange={handleInputChange}
                className="input--1"
              />
            </div>
            <div className="input">
              <label htmlFor="time">시간</label>
              <input
                type="text"
                id="time"
                name="time"
                value={values.time}
                onChange={handleInputChange}
                className="input--1"
              />
            </div>

            <div className="">
              <label htmlFor="description" className="label">
                Event Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                value={values.description}
                onChange={handleInputChange}
                className="textarea input--1"
              ></textarea>
            </div>
          </div>
          <input type="submit" value="업데이트" className="btn" />
        </form>
        <h2>Event Images</h2>
        {imagePreview ? (
          <Image src={imagePreview} height={100} width={170} alt="" />
        ) : (
          <div>
            <p>No Image uploaded</p>
          </div>
        )}
        <div>
          <button
            className="btn flex justify-center items-center space-x-2"
            onClick={() => setShowModal(true)}
          >
            <IoImageOutline className="w-6 h-6" />
            <span className="px-2"> 이미지 추가하기</span>
          </button>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h1>Modal Upload</h1>
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const json = await res.json();
  const event = await json.data;
  return {
    props: { event },
  };
}