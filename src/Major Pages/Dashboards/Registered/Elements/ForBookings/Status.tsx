const Status: React.FC = () => {
  return (
    <div className="h-130 w-80 mx-auto p-4 bg-white rounded-md shadow-md">
      {/* The outer container that holds the entire status content */}
      <div className="flex flex-col gap-5">
        {/* Organizer Info Box */}
        <div className="border border-gray-300 rounded-md p-4 w-70">
          {/* Set width of Organizer Info Box */}
          {/* Placeholder for Organizer Name */}
          <div className="mb-2 h-5 bg-gray-100 rounded w-full">John Doe</div>
          {/* Placeholder for Email */}
          <div className="mb-2 h-7 bg-gray-100 rounded w-full">
            johndoeust@gmail.com
          </div>
          {/* Placeholder for Phone */}
          <div className="mb-2 h-7 bg-gray-100 rounded w-full">09564558095</div>
        </div>

        {/* Awaiting Response Box */}
        <div className="border border-gray-300 rounded-md p-4 bg-gray-50 w-70">
          {/* Set width of Awaiting Response Box */}
          {/* Placeholder for Awaiting Response Title */}
          <div className="mb-2 h-5 bg-gray-100 rounded w-full">
            Awaiting Response
          </div>
          {/* Placeholder for Awaiting Response Text */}
          <div className="text-sm bg-gray-200 rounded w-full p-2">
            {/* Made the text smaller and added padding for better spacing */}
            You have booked for this organizer, please wait for the organizer to
            respond to your event request
          </div>
        </div>

        {/* Get in Touch Box */}
        <div className="border border-gray-300 rounded-md p-4 w-70">
          {/* Set width of Get in Touch Box */}
          {/* Placeholder for Get in Touch Title */}
          <div className="mb-2 h-5 bg-gray-100 rounded w-full">
            Get In Touch
          </div>
          {/* Placeholder for Social Links */}
          <div className="mb-1 h-5 bg-gray-100 rounded w-full">
            @linktofacebook
          </div>
          <div className="mb-1 h-5 bg-gray-100 rounded w-full">
            @linktoinstagram
          </div>
          <div className="mb-1 h-5 bg-gray-100 rounded w-full">
            @linktolinkedin
          </div>
          <div className="mb-1 h-5 bg-gray-100 rounded w-full">
            @linktowebsite
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
