import { IGif } from "@giphy/js-types";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import React from "react";

type Props = {
  gifToShow?: IGif;
  onClose?: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function Modal({ gifToShow, onClose, onNext, onPrev }: Props) {
  return (
    <div className="fixed top-0 left-0  w-screen h-screen flex justify-center items-center">
      {/* backdrop */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70" />
      {/* content */}
      <div className="relative flex justify-center items-center">
        {/* Close button */}
        <div className="absolute -top-9 right-0">
          <IconButton size="large" onClick={onClose}>
            <Clear htmlColor="white" fontSize="inherit" />
          </IconButton>
        </div>

        {/* left button */}
        <IconButton size="large" onClick={onPrev}>
          <ArrowBack htmlColor={`white`} fontSize={"large"} />
        </IconButton>

        {/* GIF */}
        <img
          src={gifToShow?.images.original.url}
          className="z-10 rounded-lg"
          alt={gifToShow?.title}
        />

        {/* right button */}
        <IconButton size="large" onClick={onNext}>
          <ArrowForward htmlColor={`white`} fontSize={"large"} />
        </IconButton>
      </div>
    </div>
  );
}

