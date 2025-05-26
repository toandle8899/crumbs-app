import React, { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon, PlayIcon, PauseIcon, BookmarkIcon, ThumbsUpIcon, RepeatIcon, MoreHorizontalIcon, BookIcon, Settings2Icon } from 'lucide-react';
interface LearnProps {
  onVideoViewed: () => void;
}
export function Learn({
  onVideoViewed
}: LearnProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedControls, setShowSpeedControls] = useState(false);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const speechSynthesis = window.speechSynthesis;
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const touchStartY = useRef(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const wordInterval = useRef<NodeJS.Timeout | null>(null);
  const mockVideos = [{
    title: 'Cognitive Development Stages',
    source: 'Introduction to Psychology',
    page: 'Page 42-43',
    sentences: ['Cognitive development is the systematic progression of thinking and understanding that occurs as children grow. Piaget proposed that children go through four distinct stages of cognitive development, each marked by increasingly sophisticated thought.', 'During the sensorimotor stage, from birth to age 2, infants learn about the world through their movements and sensations. They develop object permanence and goal-directed behavior through physical interactions.', "The preoperational stage, from ages 2 to 7, is characterized by symbolic thinking and improved language. Children struggle with logic and taking others' perspectives, showing egocentrism."]
  }, {
    title: 'Memory Formation',
    source: 'Introduction to Psychology',
    page: 'Page 44',
    sentences: ['Memory formation involves three key processes: encoding, storage, and retrieval. During encoding, information is transformed into a form that can be stored in memory.', 'The storage process involves maintaining encoded information over time, either in short-term or long-term memory systems.', 'Retrieval is the process of accessing stored information when needed, which can be affected by various factors including context and emotional state.']
  }, {
    title: 'Learning Theories',
    source: 'Introduction to Psychology',
    page: 'Page 45-46',
    sentences: ['Classical conditioning, operant conditioning, and observational learning represent three major approaches to understanding how we learn from experience and environment.', 'In classical conditioning, neutral stimuli become associated with natural responses through repeated pairing.', 'Operant conditioning involves learning through the consequences of behavior, where reinforcement increases and punishment decreases behavior frequency.']
  }];
  const currentVideo = mockVideos[currentVideoIndex];
  const currentSentence = currentVideo?.sentences?.[currentSentenceIndex] || '';
  const words = currentSentence.split(' ');
  useEffect(() => {
    if (isAutoplayEnabled) {
      setIsPlaying(true);
    }
  }, []);
  useEffect(() => {
    if (speechRef.current) speechSynthesis.cancel();
    if (isPlaying && currentSentence) {
      const utterance = new SpeechSynthesisUtterance(currentSentence);
      utterance.rate = playbackSpeed;
      speechRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
    return () => speechSynthesis.cancel();
  }, [isPlaying, currentSentence, playbackSpeed]);
  useEffect(() => {
    if (isPlaying) {
      // Word interval for highlighting
      const baseWordDuration = 800;
      wordInterval.current = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev >= words.length - 1) {
            if (currentSentenceIndex < currentVideo.sentences.length - 1) {
              setCurrentSentenceIndex(prevSentence => prevSentence + 1);
              return 0;
            } else {
              setIsPlaying(false);
              onVideoViewed();
              setCurrentVideoIndex(prev => (prev + 1) % mockVideos.length);
              setCurrentSentenceIndex(0);
              return 0;
            }
          }
          return prev + 1;
        });
      }, baseWordDuration / playbackSpeed);

      // Progress bar update
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5 * playbackSpeed;
        });
      }, 50);

      // Hide controls after timeout
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      clearInterval(wordInterval.current as NodeJS.Timeout);
      clearInterval(progressInterval.current as NodeJS.Timeout);
      setShowControls(true);
    }
    return () => {
      clearInterval(wordInterval.current as NodeJS.Timeout);
      clearInterval(progressInterval.current as NodeJS.Timeout);
      clearTimeout(controlsTimeout.current as NodeJS.Timeout);
    };
  }, [isPlaying, playbackSpeed, currentSentenceIndex, currentVideoIndex]);
  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
    setShowControls(true);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEnd;
    if (Math.abs(diff) > 50) {
      setIsTransitioning(true);
      setTimeout(() => {
        diff > 0 ? handleSwipeUp() : handleSwipeDown();
        setIsTransitioning(false);
      }, 300);
    }
  };
  const handleSwipeUp = () => {
    setCurrentVideoIndex(prev => (prev + 1) % mockVideos.length);
    setProgress(0);
    setCurrentSentenceIndex(0);
    setCurrentWordIndex(0);
    setIsPlaying(true);
  };
  const handleSwipeDown = () => {
    setCurrentVideoIndex(prev => (prev - 1 + mockVideos.length) % mockVideos.length);
    setProgress(0);
    setCurrentSentenceIndex(0);
    setCurrentWordIndex(0);
    setIsPlaying(true);
  };
  const speedOptions = [1, 1.25, 1.5, 2];
  return <main className="relative w-full h-screen flex-1 bg-[#002147] overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${isTransitioning ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="absolute inset-0 p-4 md:p-8 flex flex-col">
          <div className="bg-black/50 px-3 py-1.5 rounded-full w-fit mb-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                <BookIcon className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-white text-xs">{currentVideo.source}</p>
                <p className="text-gray-300 text-xs">{currentVideo.page}</p>
              </div>
            </div>
          </div>
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-6">
            {currentVideo.title}
          </h2>
          <div className="relative flex-1">
            <div className="absolute top-0 right-0 z-10 flex items-center space-x-2">
              <button onClick={() => setShowSpeedControls(!showSpeedControls)} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                <span className="text-sm mr-1">{playbackSpeed}x</span>
                <Settings2Icon className="w-4 h-4 inline-block" />
              </button>
            </div>
            {showSpeedControls && <div className="absolute top-12 right-0 mt-2 bg-black/80 rounded-lg p-2 min-w-[120px]">
                {speedOptions.map(speed => <button key={speed} onClick={() => {
              setPlaybackSpeed(speed);
              setShowSpeedControls(false);
            }} className={`w-full px-4 py-2 text-sm text-left transition-colors hover:bg-white/10 rounded ${playbackSpeed === speed ? 'text-purple-400' : 'text-white'}`}>
                    {speed}x
                  </button>)}
              </div>}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 md:p-6 space-y-6">
              {currentVideo.sentences.map((sentence, sentenceIndex) => <p key={sentenceIndex} className={`text-lg md:text-2xl font-medium leading-relaxed transition-opacity duration-500 ${sentenceIndex === currentSentenceIndex ? 'opacity-100' : 'opacity-30'}`}>
                  {sentence.split(' ').map((word, wordIndex) => <span key={wordIndex} className={`inline-block mr-2 transition-all duration-300 ${sentenceIndex === currentSentenceIndex && wordIndex === currentWordIndex ? 'text-white scale-105 bg-white/10 px-1 rounded' : 'text-gray-400'}`}>
                      {word}
                    </span>)}
                </p>)}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-gray-400">
            <div className="flex items-center space-x-2">
              <ChevronDownIcon className="w-5 h-5 transform rotate-180" />
              <span className="text-sm">Swipe for next</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-800">
            <div className="h-full bg-purple-500 transition-all duration-100" style={{
            width: `${progress}%`
          }} />
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 transition-opacity duration-200 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-0 right-0">
          <div className="h-1 bg-gray-800">
            <div className="h-full bg-purple-500 transition-all duration-100" style={{
            width: `${progress}%`
          }} />
          </div>
        </div>
        <div className="absolute bottom-24 right-4 flex flex-col items-center space-y-6">
          <button className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70">
            <ThumbsUpIcon className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70">
            <BookmarkIcon className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70">
            <RepeatIcon className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70">
            <MoreHorizontalIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </main>;
}