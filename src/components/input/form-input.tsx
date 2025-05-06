import { Dispatch, SetStateAction } from "react";

export const FormInput = ({
  label,
  placeholder,
  handleChangeText,
}: {
  label: string;
  placeholder: string;
  handleChangeText: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      <label className="text-sm text-[#39393A]">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full bg-[#F0F7F4] text-[#39393A] placeholder:text-[#808080] py-2 px-4 rounded-lg border"
        onChange={(e) => handleChangeText(e.target.value)}
      />
    </div>
  );
};
