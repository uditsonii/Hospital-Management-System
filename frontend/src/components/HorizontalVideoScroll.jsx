import React from 'react';

const YouTubeVideoScroll = () => {
  const videos = [
    {
      id: 1,
      url: "https://www.facebook.com/plugins/video.php?height=310&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F379873787971345%2F&show_text=false&width=560&t=0",
    },
    {
      id: 2,
      url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F809247164430312%2F&show_text=false&width=560&t=0",
    },
    {
      id: 3,
      url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F1270302164367334%2F&show_text=false&width=476&t=0",
    },
    {
      id: 4,
      url: "https://www.youtube.com/embed/5tFOUHQmXkk",
    },
    {
      id: 5,
      url: "https://www.facebook.com/plugins/video.php?height=341&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F1665079093971889%2F&show_text=false&width=560&t=0",
    },
    {
      id: 6,
      url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F1401969137411070%2F&show_text=false&width=476&t=0",
    },
  ];

  return (
    <div className="w-full overflow-hidden relative">
      <div className="flex gap-6 animate-scroll-x whitespace-nowrap py-4 px-4">
        {[...videos, ...videos].map((video, index) => (
          <div key={index} className="min-w-[320px] max-w-sm">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={video.url}
                title={`Video ${index + 1}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-48 rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideoScroll;
