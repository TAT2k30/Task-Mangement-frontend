import HomeCard from '@/components/HomeCard';
import MeetingTypeList from '@/components/MeetingTypeList';
function Home() {
    // const [currentTime, setCurrentTime] = useState(new Date());

    // //Function
    // const handleGetDate = (): string => {
    //     const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //     return currentTime.toLocaleDateString('en-US', options);
    // }
    // const handleGetTime = (): string => {
    //     const currentHours = currentTime.getHours();
    //     const currentMinutes = currentTime.getMinutes();
    //     if (currentHours > 12) {
    //         return `${currentHours}:${currentMinutes} PM`;
    //     } else {
    //         return `${currentHours}:${currentMinutes} AM`;
    //     }
    // }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 10000);
    //     return () => clearInterval(interval);
    // }, []);
    const now = new Date();
    const time = now.toLocaleTimeString('es-US', { hour: '2-digit', minute: '2-digit'});
    const date = (new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
    })).format(now);
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <div className='h-[280px] w-full rounded-[20px] bg-hero bg-cover'>
                <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                    <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM</h2>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-4xl font-extrabold lg:text-7xl'>
                            {time}
                        </h1>
                        <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
                            {date}
                        </p>
                    </div>
                </div>
            </div>
            <MeetingTypeList/>
        </section>
    )
}

export default Home;
