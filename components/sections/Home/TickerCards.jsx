"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";

const SYMBOLS = [
  "FOREXCOM:SPXUSD",
  "FOREXCOM:NSXUSD",
  "FOREXCOM:DJI",
  "FX:EURUSD",
  "BITSTAMP:BTCUSD",
  "BITSTAMP:ETHUSD",
  "CMCMARKETS:GOLD",
].join(",");

export default function TradingTicker() {
  // Load TradingView's web component script once, however many times this mounts
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = SCRIPT_SRC;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="w-full" style={{ minHeight: 46 }}>
      <tv-ticker-tape symbols={SYMBOLS}></tv-ticker-tape>
    </div>
  );
}