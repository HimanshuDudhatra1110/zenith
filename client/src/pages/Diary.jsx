import React, { useState, useRef } from "react";

const Diary = () => {
  const [pages, setPages] = useState([
    { id: 1, content: "" },
    { id: 2, content: "" },
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pageRef = useRef(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleContentChange = (e) => {
    const updatedPages = [...pages];
    updatedPages[currentPageIndex].content = e.target.value;
    setPages(updatedPages);
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0 && !isFlipping) {
      setIsFlipping(true);
      pageRef.current.classList.add("flip-reverse");

      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex - 1);
        setIsFlipping(false);
        pageRef.current.classList.remove("flip-reverse");
      }, 600);
    }
  };

  const goToNextPage = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      pageRef.current.classList.add("flip");

      setTimeout(() => {
        // Add a new page if we're at the last page
        if (currentPageIndex === pages.length - 1) {
          setPages([...pages, { id: pages.length + 1, content: "" }]);
        }

        setCurrentPageIndex(currentPageIndex + 1);
        setIsFlipping(false);
        pageRef.current.classList.remove("flip");
      }, 600);
    }
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 p-4">
      <div className="w-full max-w-4xl relative">
        {/* Left page turn button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPageIndex === 0 || isFlipping}
          className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 h-12 w-12 rounded-full flex items-center justify-center bg-amber-100 hover:bg-amber-200 shadow-md transition-colors ${
            currentPageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-800"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Diary page */}
        <div
          ref={pageRef}
          className="diary-page bg-amber-100 rounded-md shadow-lg p-6 min-h-96 transform transition-transform duration-600 relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-amber-100 rounded-md overflow-hidden">
            {/* Lined paper background */}
            <div
              className="h-full w-full bg-amber-50"
              style={{
                backgroundImage:
                  "linear-gradient(#e6ccb2 1px, transparent 1px)",
                backgroundSize: "100% 22px",
              }}
            >
              {/* Date display */}
              <div className="text-right p-4 text-amber-800 font-serif italic">
                {formatDate()}
              </div>

              {/* Page number */}
              <div className="absolute bottom-2 right-4 text-amber-800 font-serif">
                Page {pages[currentPageIndex].id}
              </div>

              {/* Content textarea */}
              <textarea
                value={pages[currentPageIndex].content}
                onChange={handleContentChange}
                placeholder="Dear Diary..."
                className="w-full h-4/5 p-4 pt-2 bg-transparent resize-none focus:outline-none font-serif text-lg text-amber-900"
                style={{ lineHeight: "24px", background: "transparent" }}
              />
            </div>
          </div>
        </div>

        {/* Right page turn button */}
        <button
          onClick={goToNextPage}
          disabled={isFlipping}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 h-12 w-12 rounded-full flex items-center justify-center bg-amber-100 hover:bg-amber-200 shadow-md transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-800"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Custom CSS for page flip animation */}
      <style jsx>{`
        @keyframes flipAnimation {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes flipReverseAnimation {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
          }
        }

        .flip {
          animation: flipAnimation 0.6s forwards;
          transform-origin: left;
          perspective: 1000px;
        }

        .flip-reverse {
          animation: flipReverseAnimation 0.6s forwards;
          transform-origin: right;
          perspective: 1000px;
        }

        .diary-page {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default Diary;
