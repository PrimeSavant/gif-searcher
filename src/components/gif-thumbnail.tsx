import { IGif } from '@giphy/js-types';
import React from 'react'

type Props = {
  gif?: IGif;
  onClick: (gif?: IGif) => void;
};

export default function GifThumbnail({ gif, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(gif)}
      className="cursor-pointer overflow-hidden w-full rounded-md bg-gray-600"
    >
      <img
        src={gif?.images.preview_gif.url}
        alt={gif?.title}
        className="w-full h-full object-cover hover:opacity-70 transition-opacity"
        style={{maxHeight: '200px'}}
        onClick={() => onClick(gif)}
      />
    </div>
  );
}
