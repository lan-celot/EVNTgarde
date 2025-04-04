const Status: React.FC = () => {
  return (
    <div className="w-[280px] p-4 bg-white rounded-md shadow-md h-[570px]">
      {/* The outer container that holds the entire status content */}
      <div className="flex flex-col gap-4 h-full">
        {/* Organizer Info Box */}
        <div className="rounded-md p-3 w-full border-b border-gray-300 flex-grow">
          {/* Organizer Name */}
          <div className="mb-2">
            <div className="text-lg font-semibold text-gray-700">
              Organizer Name
            </div>
            <div className="h-6 rounded w-full text-gray-700">John Doe</div>
          </div>

          {/* Email Label and Placeholder */}
          <div className="mb-2">
            <div className="text-sm text-gray-600">Email</div>
            <div className="h-6 rounded w-full text-gray-700">
              johndoeust@gmail.com
            </div>
          </div>

          {/* Phone Label and Placeholder */}
          <div className="mb-2">
            <div className="text-sm text-gray-600">Phone</div>
            <div className="h-6 rounded w-full text-gray-700">09564558095</div>
          </div>
        </div>

        {/* Awaiting Response Box */}
        <div className="rounded-md p-3 w-full flex-grow">
          {/* Awaiting Response Title */}
          <div className="mb-2 text-xl font-bold text-gray-700">
            Awaiting Response
          </div>
          {/* Awaiting Response Text */}
          <div className="text-sm w-full p-2 text-gray-700">
            You have booked for this organizer, please wait for the organizer to
            respond to your event request.
          </div>
        </div>

        {/* Get in Touch Box (Move Higher with reduced space) */}
        <div className="rounded-md p-3 w-full flex-grow-1">
          {/* Get in Touch Title */}
          <div className="mb-2 text-xl font-semibold text-gray-800">
            Get In Touch
          </div>
          {/* Social Links */}
          <div className="space-y-1">
            <div className="h-5 rounded text-gray-700">@linktofacebook</div>
            <div className="h-5 rounded text-gray-700">@linktoinstagram</div>
            <div className="h-5 rounded text-gray-700">@linktolinkedin</div>
            <div className="h-5 rounded text-gray-700">@linktowebsite</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
