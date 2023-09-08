import { useMeQuery } from "../../generated/graphql";
import Modal from "./Modal";
import QRCode from "react-qr-code";

interface QRCodeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const p2pTransactionPrefix = "p2pTransaction-";

const QRCodeModal: React.FC<QRCodeModalProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const { data: meData } = useMeQuery();

  const bodyContent = (
    <div className="flex flex-col gap-5 ">
      <div className="flex flex-row justify-center items-center">
        {meData?.me && <QRCode value={`${p2pTransactionPrefix}${meData?.me.username}`} />}
      </div>
      <hr className="border- border-black" />
      <div className="flex flex-row justify-between">
        <p className="text-lg md:text-2xl font-bold">Username:</p>
        {meData?.me?.username && (
          <p className="text-lg md:text-2xl font-bold">{meData?.me?.username}</p>
        )}
      </div>
      <hr className="border-1 border-black" />
      <div className="flex flex-col gap-2">
        <p className="flex flex-start text-lg md:text-2xl font-bold">Instructions</p>
        <p className="flex flex-start">Send your QR to any TMoney user to receive payment</p>
      </div>
    </div>
  );

  return <Modal isOpen={open} onClose={handleClose} title="Share Your QR" body={bodyContent} />;
};

export default QRCodeModal;
