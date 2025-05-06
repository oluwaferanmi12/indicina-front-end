import { ButtonSpinner } from "@/components/spinner/button-spinner";

export const Button = ({
  type,
  text,
  clickAction,
  loading,
}: {
  type: "button" | "submit";
  text: string;
  clickAction?: () => void;
  loading: boolean;
}) => {
  return (
    <button
      disabled={loading}
      onClick={clickAction}
      className="py-2 px-4 rounded-lg flex text-sm text-white justify-center bg-black"
      type={type}
    >
      {loading ? <ButtonSpinner /> : text}
    </button>
  );
};
