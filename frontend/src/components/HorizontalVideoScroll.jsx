import React from 'react';
import { Autoplay } from 'swiper/modules';

const YouTubeVideoScroll = () => {
  const videos = [
    { id: 1, url: "https://www.facebook.com/plugins/video.php?height=310&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F379873787971345%2F&show_text=false&width=560&t=0" ,Autoplay },
    { id: 2, url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F809247164430312%2F&show_text=false&width=560&t=0",Autoplay },
     { id: 3, url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F1270302164367334%2F&show_text=false&width=476&t=0" },
      { id: 4, url: "https://www.youtube.com/embed/5tFOUHQmXkk", Autoplay }, 
     { id: 5, url: "https://www.facebook.com/plugins/video.php?height=341&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F1665079093971889%2F&show_text=false&width=560&t=0",Autoplay },
 { id: 6, url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F100095140603012%2Fvideos%2F1401969137411070%2F&show_text=false&width=476&t=0",Autoplay },
    
    // Add more video embed URLs here
  ];

  return (
    <div className="w-full py-6 ">

      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {videos.map((video) => (
          <div key={video.id} className="min-w-[320px] max-w-sm">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={video.url}
                title={`YouTube video ${video.id}`}
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
