import logo from "../../assets/Logo.png";

export default function Logo({ className = "", size = "md", showText = true }) {
  const sizes = {
    sm: "h-12",
    md: "h-16",
    lg: "h-20",
    xl: "h-28",
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logo} 
        alt="Avocado Logo" 
        className={`${sizes[size]} w-auto object-contain ml-[0px] mr-[52px] my-[0px] drop-shadow-[0_0_1px_rgba(0,0,0,1)] dark:drop-shadow-none`}
      />
      {showText && (
        null
      )}
    </div>
  );
}