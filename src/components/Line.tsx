import LineImage from "@/assets/components/line.png";

interface LineProps {
  images?: Array<{
    image: string;
    size: string;
    align: "left" | "center" | "right";
    text?: string | JSX.Element;
  }>;
}

export function Line(props: LineProps) {
  return (
    <div className="flex justify-center items-center relative">
      <img src={LineImage} alt="Line" className="h-10 w-screen" />
      {props.images?.map((imageInfo, index) => (
        <div
          key={index}
          className={`absolute ${
            imageInfo.align === "center"
              ? "mx-auto"
              : imageInfo.align === "right"
              ? "right-0"
              : "left-0"
          }`}
          style={{
            width: imageInfo.size,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <img src={imageInfo.image} alt={"Image"} className="h-10" />
          {imageInfo.text && (
            <div className="absolute text-white text-[13px] flex font-inter font-bold top-2 left-3 z-0">
              {imageInfo.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
