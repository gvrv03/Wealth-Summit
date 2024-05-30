"use client";
import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  // State to hold the time remaining
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Function to calculate time remaining from current time to future Indian date
  function calculateTimeRemaining() {
    // Get current time and future Indian date
    const now = new Date();
    const futureDate = new Date("2024-06-10T00:00:00"); // Example future Indian date

    // Calculate time difference in milliseconds
    const timeDiff = futureDate.getTime() - now.getTime();

    // Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  // Update the timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Render the timer
  return (
    <div>
      <h2>Countdown Timer</h2>
      <p>{`${timeRemaining.days} days, ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, ${timeRemaining.seconds} seconds`}</p>
    </div>
  );
};

export default CountdownTimer;
