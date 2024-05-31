"use client";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

let interval;

export const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);
  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 3000);
  };

  return (
    <div className="relative mt-5 bg-red w-full">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={index}
            className="absolute bg-secondary w-full rounded-md p-4 shadow-xl border border-gray-700 flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <img src={card} className="h-full w-full rounded-md" />
          </motion.div>
        );
      })}
    </div>
  );
};
