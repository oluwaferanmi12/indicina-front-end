import { ReactNode } from "react";
import { Modal } from "antd";
import cancelIcon from "@/assets/svgs/closeIcon.svg"
import Image from "next/image";

export const ModalWrapper = ({
  children,
  open,
  onCancel,
  icon,
  headerText,
  large,
  medium,
}: {
  children: ReactNode;
  open: boolean;
  onCancel: () => void;
  icon?: string;
  headerText?: string;
  large?: boolean;
  medium?: boolean;
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={null}
      closeIcon={false}
      {...(large ? { width: 1200 } : medium ? { width: 700 } : {})}
    >
      <div className="flex items-center justify-between">
        <span className={"flex items-center gap-2"}>
          {headerText && (
            <p className={"text-lg font-sfRegular"}>{headerText}</p>
          )}
        </span>
        <button onClick={onCancel}>
          <Image src={cancelIcon} alt={"Cancel Icon"} />
        </button>
      </div>
      <div className="mt-3">{children}</div>
    </Modal>
  );
};
