

const GoToMarketCard = () => {


    return (
        <div className="flex flex-col rounded-xl py-6 px-6 md:px-11 my-6 gap-8 self-stretch items-center w-full shadow-md bg-white">
            <div className="flex flex-col items-center gap-2 justify-start"> {/*Header Text Class*/}
                <p className="text-2xl font-bold border-b-2 border-red-500">2 Years+ Financial Inclusion and Business Roadmap</p>
            </div>

            <div className="flex flex-col items-center justify-start gap-0">
                <img src="/assets/business/GTM_6_months.png" alt="roadmap" className='py-0 xl:w-[80%] 2xl:w-[60%]'></img>
                <img src="/assets/business/GTM_1_year.png" alt="roadmap" className='py-0 xl:w-[80%] 2xl:w-[60%]'></img>
                <img src="/assets/business/GTM_1.5_year.png" alt="roadmap" className='py-0 xl:w-[80%] 2xl:w-[60%]'></img>
                <img src="/assets/business/GTM_2_year.png" alt="roadmap" className='py-0 xl:w-[80%] 2xl:w-[60%]'></img>
            </div>


        </div>
    )
}
export default GoToMarketCard