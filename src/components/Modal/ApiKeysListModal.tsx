import Modal from "./Modal";
import { useGetApiKeyListQuery, useRevokeApiKeyMutation } from "../../generated/graphql";
import { toast } from "react-hot-toast";

import { useEffect } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ApiKeysListModal: React.FC<Props> = ({ open, setOpen }) => {
  const [revokeApiKey] = useRevokeApiKeyMutation();
  const { data: apiKeyList, refetch } = useGetApiKeyListQuery({ fetchPolicy: "cache-and-network" });

  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);

  const revokeApiKeyHandler = async (prefix: string) => {
    try {
      const { data, errors } = await revokeApiKey({ variables: { prefix } });
      if (!data?.revokeApiKey || errors?.length) {
        throw new Error("Error revoking API key");
      }
      await refetch();
      toast.success("Successfully deleted API key!");
    } catch (error) {
      console.log(error);
      toast.error("Revoking access token failed");
    }
  };

  const body = (
    <>
      {/*Paragraph Text Class items-start means align to left*/}
      <p className="font-bold text-left mb-4 text-lg">List of API Keys generated</p>
      <table className="w-full ">
        <thead>
          <tr>
            <th>Label</th>
            <th>Prefix</th>
            <th>Webhook Url</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {apiKeyList?.getApiKeyList.map((apiKey) => (
            <tr className="mx-2 text-sm">
              <td>{apiKey.label}</td>
              <td>{apiKey.prefix.slice(0, 4)}</td>
              <td>{apiKey.webhookUrl}</td>
              <button
                className=" bg-red-500 hover:bg-red-600 text-white p-2 rounded md:col-span-2 mb-2"
                type="submit"
                onClick={() => revokeApiKeyHandler(apiKey.prefix)}
              >
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  return <Modal isOpen={open} onClose={() => setOpen(false)} body={body} title="Manage API Keys" />;
};

export default ApiKeysListModal;
