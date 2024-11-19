'use client'
import Image from "next/image";
import CustomButton from "@/components/common/Button";
import { useRouter } from 'next/navigation';
export default function Landing() {
  const router = useRouter()
  return (
    <div className='space-y-14'>
      <div className='w-full h-[80vh] overflow-hidden relative rounded-t-lg'>
        <Image src='/img/green.jpg' alt='cover' fill={true} priority style={{ objectFit: 'cover' }}/>
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="mt-[72px] grid grid-cols-[0%,1fr,0%] md:grid-cols-[10%,1fr,10%] xl:grid-cols-[15%,1fr,15%] px-4">
            <div></div>
            <div>
              <div className='space-y-4'>
                <p className="h1 text-primary-600">Book. Work. Done.</p>
                <p className="subtitle1">No Time Wasted – Just the Right Place to Work</p>
              </div>

              <div>
                <p className="body1-semibold">Effortlessly reserve your next co-working space, right when you need it.</p>
                <p className="body1-semibold">Your next productive workspace is waiting. Let's jump right in!!</p>
              </div>
            </div>
            <div></div>
          </div>
        
        </div>
      </div>

      <div className='w-full flex items-center justify-center gap-8'>
        <CustomButton size="lg" className='w-[300px]' onClick={()=>{router.push('/coworkingspaces')}}>
          Find Your Space Now
        </CustomButton>
      </div>
    </div>
  );
}
