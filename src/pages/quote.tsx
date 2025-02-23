import React, { useEffect, useState } from "react";

function Quote() {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const response = await fetch("https://qapi.vercel.app/api/random");
        const data = await response.json();
        setQuote(data.quote);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchRandomQuote();
    console.log(quote, "quote");
  }, []);

  return (
    <div className="p-20">
      <div>Quote</div>
      {quote && (
        <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <p className="italic text-3xl text-blue-600">{quote}</p>
        </div>
      )}
    </div>
  );
}

export default Quote;
