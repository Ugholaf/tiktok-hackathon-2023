const FutureImprovementsCard = () => {
    return (
        <div className="flex flex-col items-center py-6 px-6 md:px-11  sm:px-11 w-full overflow-hidden md:shrink-0 bg-white rounded-lg shadow-md">
            <p className="text-2xl font-bold border-b-2 border-red-500 mb-6">Future Improvements</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 self-stretch">
                    <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
                        <img src="/src/assets/future/invest.svg" alt="invest" />
                        <p className="text-base font-bold">invest</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
                        <img src="/src/assets/future/utility.svg" alt="utility" />
                        <p className="text-base font-bold">Bill</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
                        <img src="/src/assets/future/mobile.svg" alt="mobile top up" />
                        <p className="text-base font-bold">Top up</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
                        <img src="/src/assets/future/cart.svg" alt="partners" />
                        <p className="text-base font-bold">Partners</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
                        <img src="/src/assets/future/insurance.svg" alt="Insurance" />
                        <p className="text-base font-bold">Insure</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
                        <img src="/src/assets/future/loan.svg" alt="Loan" />
                        <p className="text-base font-bold">Loan</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
                        <img src="/src/assets/future/transactions.svg" alt="Remittance" />
                        <p className="text-base font-bold">Remittance</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center gap-2 justify-center">
                        <img src="/src/assets/future/loyalty.svg" alt="Loyalty" />
                        <p className="text-base font-bold">Loyalty</p>
                    </div>


                </div>

        </div>

    );
};

export default FutureImprovementsCard;