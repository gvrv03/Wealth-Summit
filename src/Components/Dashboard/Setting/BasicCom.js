import React from "react";

const BasicCom = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <h2 className="font-semibold md:text-lg text-base">Basic</h2>
        <button className="uil uil-pen" />
      </div>{" "}
      <div>
        <h3 className="md:text-base font-medium text-gray-600 text-sm">
          Title
        </h3>
        <input
          type="text"
          className="  w-full md:text-base text-sm outline-none  text-gray-400"
          defaultValue="Edu Mingle"
        />
      </div>
      <div>
        <h3 className="md:text-base font-medium  text-gray-600 text-sm">
          Description
        </h3>
        <input
          type="text"
          className="  w-full md:text-base text-sm outline-none  text-gray-400"
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam,
          beatae. Eum a, ipsa iusto sapiente"
        />
      </div>
      <div>
        <h3 className="md:text-base font-medium text-gray-600 text-sm">
          Icons
        </h3>
        <div className="mt-2 flex flex-col md:flex-row gap-5">
          <div>
            <h4 className="font-medium text-gray-600 text-sm">Logo</h4>
            <div className="flex justify-between md:justify-start mt-1 items-center ">
              <input
                type="file"
                className="file:border-dashed file:bg-transparent file:border-blue-100 file:font-semibold text-xs file:outline-none file:py-2 file:rounded-md file:px-5 "
              />
              <input
                type="image"
                src="https://www.blogger.com/img/logo_blogger_40px.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-600 text-sm">FavIcon</h4>
            <div className="flex justify-between md:justify-start mt-1 items-center ">
              <input
                type="file"
                className="file:border-dashed file:bg-transparent file:border-blue-100 file:font-semibold text-xs file:outline-none file:py-2 file:rounded-md file:px-5 "
              />
              <input
                type="image"
                src="https://www.blogger.com/img/logo_blogger_40px.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicCom;
