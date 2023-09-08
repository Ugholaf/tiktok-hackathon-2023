import { useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { ApiKeyType, useGenerateApiKeyMutation } from "../../generated/graphql";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ApiIntegrationModal: React.FC<Props> = ({ open, setOpen }) => {
  const [generatedAPI, setGeneratedAPI] = useState("");

  const { register, watch } = useForm({
    defaultValues: {
      webhook: "",
      label: "",
    },
  });

  const webhook = watch("webhook");
  const label = watch("label");

  const disabled = webhook === "" || label === "" || generatedAPI !== "";

  const [generateAPI] = useGenerateApiKeyMutation();

  const handleGenerateAPI = async () => {
    try {
      const { data } = await generateAPI({
        variables: {
          type: ApiKeyType.CREATE_PAYMENT_QR,
          label: label,
          webhookUrl: webhook,
        },
      });

      if (data) {
        setGeneratedAPI(data.generateApiKey);
      }
    } catch (e) {
      toast.error((e as Error).message);
    }
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(generatedAPI);
  };

  const body = (
    <>
      {/*Paragraph Text Class items-start means align to left*/}
      <p className="text-base font-bold text-left">
        Get started with TMoney APIs
      </p>
      <p className="text-base text-left">
        TMoney APIs use REST, authenticate with OAuth 2.0 access tokens, and
        return HTTP response codes and responses encoded in JSON.{" "}
      </p>

      <div className="flex flex-col items-start gap-4 self-stretch">
        {" "}
        {/*Paragraph Text Class items-start means align to left*/}
        <div>
          <p className="text-base font-bold text-left">Generate SECRET API</p>
          <p className="text-base text-left">
            Do not share this API with anyone, it is tied to your business
            account.{" "}
          </p>
        </div>
        <form className="grid grid-cols-2 w-full gap-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-base font-bold text-left">Webhook:</p>
            <input
              {...register("webhook")}
              type="text"
              className="w-full h-3/4 border-2 border-black rounded-md"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-base font-bold text-left">Label:</p>
            <input
              {...register("label")}
              type="text"
              className="w-full h-3/4 border-2 border-black rounded-md"
            />
          </div>
        </form>
        <div className="flex flex-col md:flex-row items-start gap-4 my-4 self-stretch">
          <button
            disabled={disabled}
            onClick={handleGenerateAPI}
            className="bg-red-600 text-white py-2 px-3 rounded flex justify-center items-center disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            Generate API
          </button>
          <div className="w-full md:w-auto bg-gray-100 p-4 py-2 rounded flex-grow flex  items-center justify-between">
            <input
              type="text"
              value={generatedAPI}
              readOnly
              className="flex-grow w-full bg-transparent border-none"
            />
            <span
              onClick={handleCopyClick}
              className="text-gray-600 cursor-pointer"
            >
              &#128203;
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-1/8 self-stretch">
        {" "}
        {/*Paragraph Text Class items-start means align to left*/}
        <p className="text-base font-bold text-left">How to use the API</p>
        <p className="text-base text-left">
          Step 1: Add API Key to header file{" "}
        </p>
        <p className="text-base text-left">
          Step 2: add payment amount and currency{" "}
        </p>
        <p className="text-base text-left">Step 3: Send request</p>
      </div>
    </>
  );
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      body={body}
      title="Generate API to enable checkout on your site"
    />
  );
};

export default ApiIntegrationModal;
