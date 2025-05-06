"use client";
import { Button } from "@/components/button/form-button";
import { UrlDataTable } from "@/components/data-tables/url-data-table";
import { FormInput } from "@/components/input/form-input";
import { useEncodeUrl } from "@/hooks/useUrlEncode";
import { Col, Row } from "antd";
import { create } from "domain";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [url, setUrl] = useState("");
  const encodeUrlMutation = useEncodeUrl();

  const isValidUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleEncodeUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      toast.error("Url is required");
      return;
    } else if (!isValidUrl(url)) {
      toast.error("Invalid Url:");
      return;
    }

    encodeUrlMutation.mutate({ url });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className=" flex justify-center items-center w-full">
        <Row justify={"center"} className="w-full" align={"middle"}>
          <Col xs={8}>
            <div className="bg-[#E6E6E6] rounded-lg p-4 w-full">
              <p className="text-[#39393A] text-2xl text-center">Encode Url</p>
              <form onSubmit={handleEncodeUrl}>
                <FormInput
                  label="Enter Url"
                  placeholder="https://example.com or http://example.com"
                  handleChangeText={setUrl}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    text="Submit"
                    loading={encodeUrlMutation.isPending}
                  />
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <div className="my-4">

      <UrlDataTable />
      </div>
    </div>
  );
}
