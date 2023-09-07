import { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ApiKeyType,
  useGenerateApiKeyMutation,
  useMeQuery,
} from "../../generated/graphql";
import toast from "react-hot-toast";
import { onApiKeySet } from "../../redux/slices/apiKeySlice";

interface ApiIntegrationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ApiIntegrationModal: React.FC<ApiIntegrationModalProps> = ({
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const apiKeySet = useSelector((state: RootState) => state.apiKey.apiKeySet);
  const [generatedAPI, setGeneratedAPI] = useState("");

  const [generateApiKey] = useGenerateApiKeyMutation();

  const { data: meData } = useMeQuery();

  const handleButtonClick = async () => {
    try {
      if (!meData?.me) {
        throw new Error("User data not found");
      }

      const { data: apiKeyData, errors } = await generateApiKey({
        variables: {
          label: meData.me.id,
          type: ApiKeyType.CREATE_PAYMENT_QR,
        },
      });

      if (errors) {
        toast.error("Error generating API key");
        throw new Error(errors[0].message);
      }

      if (apiKeyData?.generateApiKey) {
        setGeneratedAPI(apiKeyData.generateApiKey.apiKey);
        dispatch(onApiKeySet());
      }
    } catch (error) {
      toast.error("Error generating API key");
    }
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(generatedAPI);
  };

  const bodyContent = apiKeySet ? (
    <div className="flex flex-col items-start gap-1/8 self-stretch">
      <p className="text-base font-bold text-left">
        You have already set up your api integration. If you have lost your api
        key, please contact us at TMoney@gmail.com to reset your api key.
      </p>
    </div>
  ) : (
    <>
      <div className="flex flex-col items-start gap-1/8 self-stretch">
        {" "}
        {/*Paragraph Text Class items-start means align to left*/}
        <p className="text-base font-bold text-left">
          Get started with TMoney APIs
        </p>
        <p className="text-base text-left">
          TMoney APIs use REST, authenticate with OAuth 2.0 access tokens, and
          return HTTP response codes and responses encoded in JSON.{" "}
        </p>
      </div>

      <div className="flex flex-col items-start gap-1/8 self-stretch">
        {/*Paragraph Text Class items-start means align to left*/}
        <p className="font-bold text-left">Generate SECRET API</p>
        <p className="text-left">
          Do not share this API with anyone, it is tied to your business
          account.
        </p>
        <p className="text-xl font-bold text-left text-red-500">IMPORTANT</p>
        <p className="text-base text-left">
          After the API Key is successfully generated, you will not be able to
          generate again. Please save your API Key.
        </p>
        <div className="flex flex-col md:flex-row items-start gap-4 my-4 self-stretch">
          <button
            onClick={handleButtonClick}
            className="bg-red-600 text-white py-2 px-3 rounded flex justify-center items-center"
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
          Step 1: Add API Key as "Authorization" header
        </p>
        <p className="text-base text-left">
          Step 2: Add unique orderId, payment amount and currency as request
          body
        </p>
        <p className="text-base text-left">
          Step 3: Send request with our API Key
        </p>
      </div>
    </>
  );

  return (
    <Modal
      body={bodyContent}
      isOpen={open}
      onClose={() => setOpen(false)}
      title={
        apiKeySet
          ? "Lost your API key"
          : "Generate API to enable checkout on your site"
      }
    />
  );
};
export default ApiIntegrationModal;
