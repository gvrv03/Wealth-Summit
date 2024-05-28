import Spinner from "./Spinner";

export const DefaultBTN = ({ name, loading, clickHandle ,styleCSS}) => {
  return (
    <button
      type="submit"
      disabled={loading ? true : false}
      onClick={clickHandle}
      className={` ${styleCSS} bg-primaryColor text-white font-semibold py-2`}
    >
      {loading ? <Spinner /> : name}
    </button>
  );
};
