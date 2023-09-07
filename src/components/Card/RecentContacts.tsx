const RecentContacts = () => {
  return (
    <div className="flex flex-col rounded-xl py-6 px-6 md:px-11  my-6 space-y-2 self-stretch items-center w-full shadow-md bg-white">

        <p className="text-2xl font-bold border-b-2 border-red-500 mb-6">Recent Contacts</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 self-stretch">
            <div className="col-span-1 flex flex-col items-center gap-2 justify-start">
                <img src="/assets/recentcontact/person.svg" alt="person" />
                <p className="text-base font-bold">Roy</p>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2 justify-start">
                <img src="/assets/recentcontact/person.svg" alt="person" />
                <p className="text-base font-bold">Andrew</p>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2 justify-start">
                <img src="/assets/recentcontact/person.svg" alt="person" />
                <p className="text-base font-bold">Chang Jun</p>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2 justify-start">
                <img src="/assets/recentcontact/person.svg" alt="person" />
                <p className="text-base font-bold">Darius</p>
            </div>
        </div>

        <div className="flex flex-row justify-center space-x-4">
            <img src="/assets/recentcontact/viewmore.svg" alt="person" />
            <p className="text-base font-bold ">View More</p>
        </div>

    </div >
  )
}
export default RecentContacts