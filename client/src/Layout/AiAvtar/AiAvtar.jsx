import Lottie from "lottie-react";
import aiAvatar from "../../assets/ai-avatar.json";

const AiAvatar = () => {
  return (
    <div className="w-64 h-64">
      <Lottie animationData={aiAvatar} loop={true} />
    </div>
  );
};

export default AiAvatar;
