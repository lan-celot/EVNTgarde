export function WelcomeBanner() {
  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/images/banner.jpg" // Update this path to your custom image
          alt="Event crowd" 
          className="h-full w-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Adjust overlay darkness */}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          {/* Logo */}
          <div className="mb-8 sm:mb-0 sm:mr-8 flex-shrink-0">
            <img 
              src="/images/logo.png" // Your custom logo path
              alt="Logo"
              className="h-72 sm:h-96 lg:h-[393px] w-auto object-contain" // Increased height
            />
          </div>

          {/* Text Content */}
          <div className="text-center sm:text-left flex flex-col justify-center self-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to Your Event Management Hub
            </h1>
            <p className="mt-6 max-w-lg text-lg text-gray-300 sm:mx-auto md:mt-8 md:max-w-xl md:text-xl lg:mx-0">
              Discover tailored events services and manage everything from one central dashboard. Your next successful
              event starts here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
