import Spinner from "./Spinner";

export const DefaultBTN = ({ name, loading, clickHandle ,styleCSS}) => {
  return (
    <button
      type="submit"
      disabled={loading ? true : false}
      onClick={clickHandle}
      className={` ${styleCSS}  bg-[#ffe100] text-black  font-semibold py-2`}
    >
      {loading ? <Spinner /> : name}
    </button>
  );
};
