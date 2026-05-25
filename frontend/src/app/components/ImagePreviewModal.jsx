import { useEffect } from "react";

export default function ImagePreviewModal({ src, alt = "Vista previa", onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white dark:bg-gray-700 text-[#0d1b0d] dark:text-white size-10 rounded-full text-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-600 shadow-lg z-10 flex items-center justify-center"
        >
          ✕
        </button>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="hidden items-center justify-center w-64 h-64 bg-gray-800 rounded-2xl text-8xl"
        >
          🥑
        </div>
      </div>
    </div>
  );
}
