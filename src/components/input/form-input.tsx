import { Dispatch, SetStateAction } from "react";

export const FormInput = ({
  label,
  placeholder,
  handleChangeText,
  value
}: {
  label: string;
  placeholder: string;
  handleChangeText: Dispatch<SetStateAction<string>>;
  value: string
}) => {
  return (
    <div>
      <label className="text-sm text-[#39393A]">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        className="w-full bg-[#F0F7F4] text-[#39393A] placeholder:text-[#808080] py-2 px-4 rounded-lg border"
        onChange={(e) => handleChangeText(e.target.value)}
      />
    </div>
  );
};
