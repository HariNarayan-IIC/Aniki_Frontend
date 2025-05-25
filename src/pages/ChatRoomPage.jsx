import ChatWindow from "../components/ChatWindow";
import { useParams } from "react-router-dom";

const SignupPage = () => {
  const { roomId } = useParams();
  return (
    <div className="h-[calc(100vh-154px)] md:h-[calc(100vh-74px)] py-4">
      <ChatWindow roomId={roomId}/>
    </div>
  );
};

export default SignupPage;
