import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { UrlRecord } from "@/interfaces/data-interface";
import { useFetchUrls } from "@/hooks/useFetchUrls";
import copyIcon from "@/assets/svgs/copyIcon.svg";
import moment from "moment";
import { toast } from "sonner";
import { dateExplicit } from "@/utils/date-formats";
import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { Button } from "@/components/button/form-button";
import { ModalWrapper } from "@/components/modal/modal-wrapper";
import { FormInput } from "@/components/input/form-input";
import { isValidUrl } from "@/utils/isValidUrl";
import { useDecodeUrl } from "@/hooks/useDecodeUrl";
import Image from "next/image";

export const UrlDataTable = () => {
  const { data = [], isLoading } = useFetchUrls();
  const [filteredData, setFilteredData] = useState<UrlRecord[]>([]);
  const [showDecodeModal, setShowDecodeModal] = useState(false);
  const [decodeUrl, setDecodeUrl] = useState("");

  const decodeUrlMutation = useDecodeUrl(() => {
    setDecodeUrl("");
  });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  const columns = [
    {
      header: "Original URL",
      field: "title",
      body: (rowData: UrlRecord) => (
        <div className="truncate max-w-[300px] text-blue-900 flex items-center gap-2  px-2">
          <a href={rowData.originalUrl} target="_blank">
            <p>{rowData.originalUrl}</p>
          </a>

          <img
            src={copyIcon.src}
            alt="Copy Icon"
            className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => {
              try {
                navigator.clipboard.writeText(rowData.originalUrl);
                toast.success("Copied");
              } catch (e) {
                toast.error("Unable to copy url");
              }
            }}
          />
        </div>
      ),
    },
    {
      header: "Short URL",
      body: (rowData: UrlRecord) => (
        <div className="flex items-center gap-2">
          <a href={rowData.short_url} target="_blank">
            <span className="truncate max-w-[300px] text-blue-900  px-2">
              {rowData.short_url}
            </span>
          </a>

          <img
            src={copyIcon.src}
            alt="Copy Icon"
            className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => {
              try {
                navigator.clipboard.writeText(rowData.short_url);
                toast.success("Copied");
              } catch (e) {
                toast.error("Unable to copy url");
              }
            }}
          />
        </div>
      ),
    },
    {
      header: "visits",
      body: (rowData: UrlRecord) => (
        <div className="text-gray-500">
          {/* {new Date(rowData.lastmodified).toLocaleDateString()} */}
          <p>{rowData.visits}</p>
        </div>
      ),
    },
    {
      header: "Created at",
      body: (rowData: UrlRecord) => <p>{dateExplicit(rowData.createdAt)}</p>,
    },
    {
      header: "Last visited",
      body: (rowData: UrlRecord) => <p>{dateExplicit(rowData.updatedAt)}</p>,
    },
  ];

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const searchVal = e.target.value.toLowerCase();
      const result = data.filter((item) => {
        return (
          item.originalUrl.toLowerCase().includes(searchVal) ||
          item.short_code.toLowerCase().includes(searchVal) ||
          item.short_url.toLowerCase().includes(searchVal)
        );
      });
      setFilteredData([...result]);
    } else {
      setFilteredData([...data]);
    }
  }, 300);

  const handleDecodeUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!decodeUrl) {
      toast.error("Url is required");
    } else if (!isValidUrl(decodeUrl)) {
      toast.error("Invalid Url:");
      return;
    }
    decodeUrlMutation.mutate({ url: decodeUrl });
  };

  return (
    <div className="w-full overflow-x-auto px-4 py-6">
      <ModalWrapper
        open={showDecodeModal}
        headerText="Decode Url"
        onCancel={() => {
          setShowDecodeModal(false);
        }}
      >
        <form onSubmit={handleDecodeUrl}>
          <FormInput
            handleChangeText={setDecodeUrl}
            label="Enter Short Url"
            placeholder="https://short.est/ty2Wzd"
            value={decodeUrl}
          />
          <div className="flex mt-2 justify-end">
            <Button
              loading={decodeUrlMutation.isPending}
              text="Decode"
              type="submit"
              clickAction={() => {}}
            />
          </div>
        </form>
        {decodeUrlMutation.data?.url && (
          <div className="text-black flex items-center gap-2 bg-[#DAF0E3] my-3 w-full p-4 rounded-lg">
            <p>{decodeUrlMutation.data?.url}</p>
            <span
              onClick={() => {
                try {
                  navigator.clipboard.writeText(decodeUrlMutation.data.url);
                  toast.success("Copied");
                } catch (e) {
                  toast.error("Unable to copy url");
                }
              }}
              className="cursor-pointer"
            >
              <Image src={copyIcon} alt="" />
            </span>
          </div>
        )}
      </ModalWrapper>
      {isLoading ? (
        <div className="flex justify-center items-center h-48 text-gray-600 text-lg">
          Loading...
        </div>
      ) : (
        <div className="min-w-[900px]">
          <div className="flex items-center justify-end gap-2">
            <Button
              loading={false}
              text="Decode a url"
              type="button"
              clickAction={() => {
                setShowDecodeModal(true);
              }}
            />
            <input
              className="py-2 mb-2 px-3 bg-[#f5f5f5] rounded-lg"
              onChange={(e) => {
                if (e.target.value.length > 3) {
                  handleSearch(e);
                } else {
                  setFilteredData([...data]);
                }
              }}
              placeholder="search"
            />
          </div>
          <DataTable
            value={filteredData}
            tableStyle={{ minWidth: "100%" }}
            columnResizeMode="fit"
            scrollable
            scrollHeight="400px"
            className="shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            {columns.map((col, index) => (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                body={col.body}
                headerClassName="bg-gray-100 text-blue-800 font-semibold text-sm px-3"
                className="text-sm px-2 py-1"
              />
            ))}
          </DataTable>
        </div>
      )}
    </div>
  );
};
