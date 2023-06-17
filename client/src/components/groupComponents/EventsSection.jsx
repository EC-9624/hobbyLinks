import React from "react";

function EventsSection({ events }) {
  return (
    <div className=' my-4 mx-auto w-full '>
      <h1 className='text-3xl font-bold'>Upcoming Events</h1>
      {/* query all the event from this group */}
      <div className='bg-slate-100 mt-4'>
        <div className='flex'>
          <img src={events.imgUrl} alt='' className='w-52' />
          <div>
            <h1 className='text-xl'>Event_Name</h1>
            {events.desc}
          </div>
        </div>
      </div>
      <div className=' bg-slate-100 mt-4'>
        <div className='flex'>
          <img src={events.imgUrl} alt='' className='w-52' />
          <div>
            <h1 className='text-xl'>Event_Name</h1>
            {events.desc}
          </div>
        </div>
      </div>
      <div className=' bg-slate-100 mt-4'>
        <div className='flex'>
          <img src={events.imgUrl} alt='' className='w-52' />
          <div>
            <h1 className='text-xl'>Event_Name</h1>
            {events.desc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsSection;
