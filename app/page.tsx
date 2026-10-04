"use client";

import { useRouter } from 'next/navigation';
import StarField from './components/StarField';
import GatewayEntrance from './components/sections/GatewayEntrance';

export default function Home() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/space');
  };

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden">
      <StarField />
      <GatewayEntrance onEnter={handleEnter} />
    </main>
  );
}