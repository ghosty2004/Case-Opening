import { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import Line from "@/components/Line";

const sounds = {
  caseOpening: new Audio(
    (await import("@/assets/sounds/case-opening.mp3")).default
  ),
};

const items = [
  {
    id: 1,
    image: (await import("@/assets/components/items/1.png")).default,
  },
  {
    id: 2,
    image: (await import("@/assets/components/items/2.png")).default,
  },
  {
    id: 3,
    image: (await import("@/assets/components/items/3.png")).default,
  },
  {
    id: 4,
    image: (await import("@/assets/components/items/4.png")).default,
  },
  {
    id: 5,
    image: (await import("@/assets/components/items/5.png")).default,
  },
  {
    id: 6,
    image: (await import("@/assets/components/items/6.png")).default,
  },
  {
    id: 7,
    image: (await import("@/assets/components/items/7.png")).default,
  },
  {
    id: 8,
    image: (await import("@/assets/components/items/8.png")).default,
  },
  {
    id: 9,
    image: (await import("@/assets/components/items/9.png")).default,
  },
  {
    id: 10,
    image: (await import("@/assets/components/items/10.png")).default,
  },
];

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
};

const generateRandomItems = (count: number) => {
  const shuffledItems = shuffleArray(items);

  const generatedItems = [];
  for (let i = 0; i < count; i++) {
    generatedItems.push(
      shuffledItems[Math.floor(Math.random() * shuffledItems.length)]
    );
  }

  return generatedItems;
};

const components = {
  cases: {
    green: (await import("@/assets/components/cases/green-case.png")).default,
    white: (await import("@/assets/components/cases/red-case.png")).default,
  },

  generatedItems: generateRandomItems(100),

  // box
  blackBox: (await import("@/assets/components/black-box.png")).default,
  premiumBox: (await import("@/assets/components/premium-box.png")).default,
  caseContentBox: (await import("@/assets/components/case-content-box.png"))
    .default,

  // others
  line: (await import("@/assets/components/line.png")).default,
  header: (await import("@/assets/components/header.png")).default,
  arrowDown: (await import("@/assets/components/arrow-down.png")).default,
  caseClosed: (await import("@/assets/components/case-closed.png")).default,
  caseOpened: (await import("@/assets/components/case-opened.png")).default,
};

type Pages = "selectCase" | "selectedCase" | "openCase";
type Cases = keyof typeof components.cases;
type SpinStatus = "none" | "awaitToStart" | "started" | "finished";

export default function App() {
  const [page, setPage] = useState<Pages>("selectCase");
  const [selectedCase, setSelectedCase] = useState<Cases>();
  const [spinWinIndex, setSpinWinIndex] = useState<number>(0);
  const [spinStatus, setSpinStatus] = useState<SpinStatus>("none");

  const setSpinWin = (win: number) => {
    const generatedItems = components.generatedItems.slice();
    const winIndex = generatedItems.reduceRight((acc, obj, index) => {
      if (obj["id"] === win && acc === -1) {
        return index;
      }
      return acc;
    }, -1);

    setSpinWinIndex(winIndex);
  };

  useEffect(() => {
    if (spinStatus === "awaitToStart") {
      setSpinWin(3);
      setSpinStatus("started");
      sounds.caseOpening.play();
    }
  }, [spinStatus]);

  return (
    <div className="bg-[black] bg-cover h-screen pt-10">
      <div className="flex flex-col w-[100vw] justify-center items-center">
        <img src={components.header} alt="Header" className="w-[70vw]" />

        <div className="w-[70vw]">
          {page === "selectCase" && (
            <div className="flex flex-wrap justify-center">
              <Line
                images={[
                  {
                    image: components.premiumBox,
                    size: "10vw",
                    align: "left",
                  },
                  {
                    image: components.blackBox,
                    size: "6vw",
                    align: "right",
                    text: (
                      <>
                        CASES
                        <div className="text-green-600">
                          &nbsp;{Object.entries(components.cases).length}
                        </div>
                      </>
                    ),
                  },
                ]}
              />
              {(
                Object.entries(components.cases) as Array<
                  [keyof typeof components.cases, string]
                >
              ).map(([selectedCase, img], index) => (
                <img
                  key={index}
                  src={img}
                  className={`w-[10vw] m-2 hover:drop-shadow-[0_0_0.9rem_gray]`}
                  onClick={() => {
                    setPage("selectedCase");
                    setSelectedCase(selectedCase);
                  }}
                />
              ))}
            </div>
          )}

          {page === "selectedCase" && (
            <>
              <Line />
              <div className="flex justify-start">
                <button
                  className="flex justify-center items-center bg-gray-600 p-2 rounded drop-shadow-[0_0_0.2rem_gray] hover:drop-shadow-[0_0_0.4rem_gray]"
                  onClick={() => {
                    setPage("selectCase");
                  }}
                >
                  <AiOutlineArrowLeft />
                  <div className="font-inter">GO BACK</div>
                </button>
              </div>

              <div className="flex justify-center">
                <motion.img
                  src={components.caseClosed}
                  className="w-80"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 3, ease: "easeInOut" },
                  }}
                />

                <div className="ml-32">
                  <button
                    className="bg-gray-700 p-2 pl-5 pr-5 h-10 rounded drop-shadow-[0_0_0.2rem_gray] hover:drop-shadow-[0_0_0.4rem_gray]"
                    onClick={() => {
                      setPage("openCase");
                      setSpinStatus("awaitToStart");
                    }}
                  >
                    <div className="font-inter">OPEN CASE</div>
                  </button>
                </div>
              </div>
            </>
          )}

          {page === "openCase" && (
            <div className="flex flex-col justify-center items-center">
              <Line />

              <img
                src={components.arrowDown}
                className="flex justify-center items-center w-[3vw]"
              />

              {spinStatus === "started" && (
                <div className="flex flex-row justify-left items-center overflow-x-hidden max-w-1">
                  <motion.div
                    className="flex flex-row"
                    initial={{ x: 0 }}
                    animate={{
                      x: `${-10 * spinWinIndex - -10 * 3}vw`,
                    }}
                    transition={{
                      duration: 5.5,
                    }}
                  >
                    {components.generatedItems.map(({ image }, index) => (
                      <img
                        key={index}
                        src={image}
                        className="bg-[#243d65aa] w-[10vw]"
                      />
                    ))}
                  </motion.div>
                </div>
              )}
            </div>
          )}

          {(page === "selectedCase" || page === "openCase") && (
            <div className="flex flex-col mt-10">
              <Line
                images={[
                  {
                    image: components.caseContentBox,
                    size: "10vw",
                    align: "left",
                  },
                  {
                    image: components.blackBox,
                    size: "6vw",
                    align: "right",
                    text: (
                      <>
                        CONTENT
                        <div className="text-green-600">
                          &nbsp;{Object.entries(items).length}
                        </div>
                      </>
                    ),
                  },
                ]}
              />

              <div className="flex flex-wrap justify-center">
                {items.map(({ image }, index) => (
                  <div
                    key={index}
                    className="p-8 m-2 rounded bg-[#243d65aa] hover:bg-[#648dcfaa]"
                  >
                    <img src={image} className="w-20"></img>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
