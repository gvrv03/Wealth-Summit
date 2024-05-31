"use client";
import { AddConatctAPI } from "@/API/Contact/ContactAPI";
import { DefaultBTN } from "@/Components/Home/Utility/Utility";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ContactUS = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setloading] = useState(false);

  // Handler function to update form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setloading(true);
      const res = await AddConatctAPI(formData);
      if (res?.isSuccess) {
        return toast.success(res?.message);
      }
      return toast.error(res?.error);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="body-font relative">
      <div className="container mx-auto">
        <div className="bg-ground p-5 border border-gray-700 rounded-sm md:rounded-md lg:w-1/2 md:w-2/3 mx-auto">
          <h3 className="text-white  font-bold text-2xl ">Contact Us</h3>
          <div className="text-gray-400 my-2" > wealthsummit@wealthsummit.shop</div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              {/* Name */}
              <div className="p-2 flex gap-5 md:flex-row flex-col w-full">
                <div className="relative w-full">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-300 font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-secondary p-3 rounded-sm md:rounded-md outline-none"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {/* Email */}
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-300 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-secondary p-3 rounded-sm md:rounded-md outline-none"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Subject */}
              <div className="relative p-2 w-full">
                <label
                  htmlFor="subject"
                  className="leading-7 text-sm text-gray-300 font-semibold"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full bg-secondary p-3 rounded-sm md:rounded-md outline-none"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              {/* Message */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-300 font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-secondary p-3 rounded-sm md:rounded-md outline-none"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              {/* Submit Button */}
              <div className="p-2 w-full">
                <DefaultBTN
                  loading={loading}
                  name="Submit"
                  styleCSS="px-5 w-full md:w-fit md:rounded-md rounded-sm"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUS;
